/** Local, same-origin Web backend for the dedicated PaddleOCR Settings page. */
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Context } from '@deepseek-ai/cordis';
import { type PaddleOCRConfig } from './config.js';
export declare const SETTINGS_ROUTE = "/_dsh/paddleocr/settings";
export interface PaddleOCRSettingsSnapshot {
    schemaVersion: 1;
    writable: boolean;
    settings: {
        value: PaddleOCRConfig;
        revision: number;
        applies: 'live';
    };
    credential: {
        ref: string;
        configured: boolean;
        source?: string;
        writable: boolean;
    };
    runtime: {
        uvAvailable: boolean;
        uvPath?: string;
    };
    release: {
        pluginVersion: string;
        upstreamRepository: string;
        upstreamCommit: string;
    };
}
export declare class PaddleOCRWebBackend {
    private readonly ctx;
    constructor(ctx: Context);
    snapshot(): Promise<PaddleOCRSettingsSnapshot>;
    private assertCurrentRef;
    handle(req: IncomingMessage, res: ServerResponse): Promise<void>;
}
/** Mount the Web-only route without making webServer mandatory in headless profiles. */
export declare function installPaddleOCRWeb(ctx: Context, backend: PaddleOCRWebBackend): void;
//# sourceMappingURL=web.d.ts.map