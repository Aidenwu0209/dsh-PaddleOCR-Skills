/**
 * User-editable PaddleOCR endpoint, credential-reference, timeout, and runtime configuration.
 * The token value is stored by the DSH credential provider and never appears in this schema.
 */
import { isAbsolute, normalize, sep } from 'node:path';
import { credentialRef } from '@deepseek-ai/dsh-credentials';
import { settingsNamespace } from '@deepseek-ai/dsh-settings';
import z from '@deepseek-ai/schemastery';
/** Settings namespace owned by this plugin. */
export const PADDLEOCR_SETTINGS_NAMESPACE = settingsNamespace('paddleocr-skills');
export const DEFAULT_CREDENTIAL_REF = 'PADDLEOCR_ACCESS_TOKEN';
export const DEFAULT_TIMEOUT_SECONDS = 120;
export const DEFAULT_RESULT_DIRECTORY = '.dsh-paddleocr/results';
export const DEFAULT_UV_PATH = 'uv';
/** Schemastery configuration surfaced through Cordis and DSH Settings. */
export const Config = z.object({
    ocrApiUrl: z.string().default(''),
    docParsingApiUrl: z.string().default(''),
    credential: z.string().default(DEFAULT_CREDENTIAL_REF),
    ocrTimeoutSeconds: z.number().default(DEFAULT_TIMEOUT_SECONDS),
    docParsingTimeoutSeconds: z.number().default(DEFAULT_TIMEOUT_SECONDS),
    uvPath: z.string().default(DEFAULT_UV_PATH),
    resultDirectory: z.string().default(DEFAULT_RESULT_DIRECTORY),
});
const MAX_TIMEOUT_SECONDS = 3600;
function endpoint(raw, suffix, field) {
    const value = raw?.trim() ?? '';
    if (value.length === 0)
        return '';
    let parsed;
    try {
        parsed = new URL(value);
    }
    catch {
        throw new TypeError(`${field} must be a valid HTTPS URL`);
    }
    if (parsed.protocol !== 'https:')
        throw new TypeError(`${field} must use https://`);
    if (!parsed.pathname.replace(/\/+$/u, '').endsWith(suffix)) {
        throw new TypeError(`${field} must be a full endpoint ending with ${suffix}`);
    }
    parsed.hash = '';
    return parsed.toString().replace(/\/+$/u, '');
}
function timeout(raw, field) {
    const value = raw ?? DEFAULT_TIMEOUT_SECONDS;
    if (!Number.isInteger(value) || value < 1 || value > MAX_TIMEOUT_SECONDS) {
        throw new TypeError(`${field} must be an integer between 1 and ${MAX_TIMEOUT_SECONDS}`);
    }
    return value;
}
function relativeResultDirectory(raw) {
    const value = raw?.trim() || DEFAULT_RESULT_DIRECTORY;
    if (value.includes('\0') || isAbsolute(value)) {
        throw new TypeError('resultDirectory must be a workspace-relative path');
    }
    const normalized = normalize(value);
    if (normalized === '..' || normalized.startsWith(`..${sep}`)) {
        throw new TypeError('resultDirectory must stay inside the session workspace');
    }
    return normalized;
}
/** Validate and materialize one configuration generation. */
export function resolveConfig(config = {}) {
    const rawCredential = config.credential?.trim() || DEFAULT_CREDENTIAL_REF;
    const uvPath = config.uvPath?.trim() || DEFAULT_UV_PATH;
    return {
        ocrApiUrl: endpoint(config.ocrApiUrl, '/ocr', 'ocrApiUrl'),
        docParsingApiUrl: endpoint(config.docParsingApiUrl, '/layout-parsing', 'docParsingApiUrl'),
        credential: credentialRef(rawCredential),
        ocrTimeoutSeconds: timeout(config.ocrTimeoutSeconds, 'ocrTimeoutSeconds'),
        docParsingTimeoutSeconds: timeout(config.docParsingTimeoutSeconds, 'docParsingTimeoutSeconds'),
        uvPath,
        resultDirectory: relativeResultDirectory(config.resultDirectory),
    };
}
//# sourceMappingURL=config.js.map