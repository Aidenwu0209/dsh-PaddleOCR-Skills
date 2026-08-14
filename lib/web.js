/** Local, same-origin Web backend for the dedicated PaddleOCR Settings page. */
import { credentialRef } from '@deepseek-ai/dsh-credentials';
import { SettingsConflictError } from '@deepseek-ai/dsh-settings';
import { PADDLEOCR_SETTINGS_NAMESPACE, resolveConfig, } from './config.js';
import { PLUGIN_VERSION, UPSTREAM_COMMIT, UPSTREAM_REPOSITORY } from './version.js';
export const SETTINGS_ROUTE = '/_dsh/paddleocr/settings';
function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function descriptorOf(ctx) {
    const descriptor = ctx.settings.describe({ redactSecrets: true }).find(row => row.ns === PADDLEOCR_SETTINGS_NAMESPACE);
    if (descriptor === undefined)
        throw new Error('PaddleOCR Settings namespace is not registered');
    return descriptor;
}
function responseJson(res, status, body) {
    const bytes = Buffer.from(JSON.stringify(body));
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Length', String(bytes.length));
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'");
    res.writeHead(status);
    res.end(bytes);
}
function fail(res, status, code, message) {
    responseJson(res, status, { ok: false, error: { code, message } });
}
function localSocket(req) {
    const address = req.socket.remoteAddress;
    return address === '127.0.0.1' || address === '::1' || address === '::ffff:127.0.0.1';
}
function sameOriginPost(req) {
    if (req.headers['sec-fetch-site'] === 'cross-site')
        return false;
    const origin = req.headers.origin;
    if (origin === undefined)
        return req.headers['sec-fetch-site'] === 'same-origin' || req.headers['sec-fetch-site'] === 'same-site' || req.headers['sec-fetch-site'] === 'none';
    const host = req.headers.host;
    if (host === undefined)
        return false;
    try {
        const parsed = new URL(origin);
        return (parsed.protocol === 'http:' || parsed.protocol === 'https:') && parsed.host === host;
    }
    catch {
        return false;
    }
}
async function readJson(req, maxBytes = 64 * 1024) {
    const contentType = req.headers['content-type']?.split(';', 1)[0]?.trim().toLowerCase();
    if (contentType !== 'application/json')
        throw new TypeError('Content-Type must be application/json');
    const chunks = [];
    let size = 0;
    for await (const chunk of req) {
        const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        size += bytes.length;
        if (size > maxBytes)
            throw new RangeError(`request body exceeds ${String(maxBytes)} bytes`);
        chunks.push(bytes);
    }
    if (chunks.length === 0)
        throw new TypeError('request body is empty');
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
function parseRequest(value) {
    if (!isRecord(value) || typeof value.action !== 'string')
        throw new TypeError('request action is required');
    if (value.action === 'save') {
        if (!Number.isSafeInteger(value.expectedRevision) || value.expectedRevision < 0)
            throw new TypeError('expectedRevision must be a non-negative integer');
        if (!isRecord(value.value))
            throw new TypeError('save.value must be an object');
        return { action: 'save', expectedRevision: value.expectedRevision, value: value.value };
    }
    if (value.action === 'credentialSet') {
        if (typeof value.ref !== 'string' || typeof value.value !== 'string')
            throw new TypeError('credentialSet requires string ref and value');
        if (value.value.trim().length === 0 || value.value.length > 8192)
            throw new TypeError('credential value must contain 1-8192 characters');
        return { action: 'credentialSet', ref: value.ref, value: value.value.trim() };
    }
    if (value.action === 'credentialUnset') {
        if (typeof value.ref !== 'string')
            throw new TypeError('credentialUnset requires a string ref');
        return { action: 'credentialUnset', ref: value.ref };
    }
    throw new TypeError(`unsupported action: ${value.action}`);
}
function messageOf(error) {
    return error instanceof Error ? error.message : String(error);
}
export class PaddleOCRWebBackend {
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
    }
    async snapshot() {
        const descriptor = descriptorOf(this.ctx);
        const value = descriptor.value;
        const config = resolveConfig(value);
        const credential = await this.ctx.credentials.describe(config.credential);
        let uvPath;
        try {
            uvPath = await this.ctx.subprocess.resolveExecutable(config.uvPath);
        }
        catch {
            uvPath = undefined;
        }
        return {
            schemaVersion: 1,
            writable: this.ctx.settings.writable,
            settings: { value, revision: descriptor.revision, applies: 'live' },
            credential: {
                ref: String(config.credential),
                configured: credential.configured,
                ...(credential.source === undefined ? {} : { source: credential.source }),
                writable: credential.writable,
            },
            runtime: { uvAvailable: uvPath !== undefined, ...(uvPath === undefined ? {} : { uvPath }) },
            release: { pluginVersion: PLUGIN_VERSION, upstreamRepository: UPSTREAM_REPOSITORY, upstreamCommit: UPSTREAM_COMMIT },
        };
    }
    assertCurrentRef(ref) {
        const current = resolveConfig(descriptorOf(this.ctx).value).credential;
        if (String(current) !== ref)
            throw new Error('credential reference changed; refresh the page and retry');
        credentialRef(ref);
    }
    async handle(req, res) {
        if (!localSocket(req)) {
            fail(res, 403, 'local-only', 'PaddleOCR Settings are writable from the local DSH Web application only');
            return;
        }
        if (req.method === 'GET') {
            try {
                responseJson(res, 200, { ok: true, value: await this.snapshot() });
            }
            catch (error) {
                this.ctx.logger.warn('dsh-paddleocr-skills Settings snapshot failed: %s', messageOf(error));
                fail(res, 503, 'settings-unavailable', 'PaddleOCR Settings are unavailable');
            }
            return;
        }
        if (req.method !== 'POST') {
            res.setHeader('Allow', 'GET, POST');
            fail(res, 405, 'method-not-allowed', 'Use GET or POST');
            return;
        }
        if (!sameOriginPost(req)) {
            fail(res, 403, 'origin-rejected', 'The request must originate from this DSH Web application');
            return;
        }
        let request;
        try {
            request = parseRequest(await readJson(req));
        }
        catch (error) {
            fail(res, error instanceof RangeError ? 413 : 400, 'invalid-request', messageOf(error));
            return;
        }
        try {
            if (request.action === 'save') {
                resolveConfig(request.value);
                await this.ctx.settings.replace(PADDLEOCR_SETTINGS_NAMESPACE, request.value, request.expectedRevision);
            }
            else if (request.action === 'credentialSet') {
                this.assertCurrentRef(request.ref);
                await this.ctx.credentials.set(credentialRef(request.ref), request.value);
            }
            else {
                this.assertCurrentRef(request.ref);
                await this.ctx.credentials.unset(credentialRef(request.ref));
            }
            responseJson(res, 200, { ok: true, value: await this.snapshot() });
        }
        catch (error) {
            const conflict = error instanceof SettingsConflictError;
            this.ctx.logger.warn('dsh-paddleocr-skills Web action=%s failed: %s', request.action, messageOf(error));
            fail(res, conflict ? 409 : 400, conflict ? 'settings-conflict' : 'request-rejected', messageOf(error));
        }
    }
}
/** Mount the Web-only route without making webServer mandatory in headless profiles. */
export function installPaddleOCRWeb(ctx, backend) {
    ctx.inject(['webServer'], webCtx => {
        webCtx.effect(() => webCtx.webServer.register({
            kind: 'exact',
            path: SETTINGS_ROUTE,
            handler: (req, res) => backend.handle(req, res),
        }), 'dsh-paddleocr-skills: Web Settings route');
    });
}
//# sourceMappingURL=web.js.map