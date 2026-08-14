/** Native DSH tools backed by the pinned PaddleOCR skill scripts. */
import type { Context } from '@deepseek-ai/cordis';
import { type ToolDefinition } from '@deepseek-ai/dsh-tools';
import type { ResolvedPaddleOCRConfig } from './config.js';
/** Resolve a local input and refuse symlink escapes from the session workspace. */
export declare function resolveWorkspaceFile(workspace: string, raw: string): Promise<string>;
/** Create and canonicalize the configured result directory without allowing a symlink escape. */
export declare function resolveResultDirectory(workspace: string, raw: string): Promise<string>;
/** Build both globally registered native tools. */
export declare function createPaddleOCRTools(ctx: Context, readConfig: () => ResolvedPaddleOCRConfig): ToolDefinition[];
//# sourceMappingURL=tools.d.ts.map