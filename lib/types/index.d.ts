/** PaddleOCR Skills profile bundle for DeepSeek Harness. */
import type { Context } from '@deepseek-ai/cordis';
import { Config, type PaddleOCRConfig } from './config.js';
export declare const name = "dsh-paddleocr-skills";
export declare const inject: string[];
export { Config };
/** Register live Settings, both skills, both native tools, and the optional Web editor. */
export declare function apply(ctx: Context, config?: PaddleOCRConfig): Promise<() => void>;
//# sourceMappingURL=index.d.ts.map