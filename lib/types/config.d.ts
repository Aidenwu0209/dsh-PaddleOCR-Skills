/**
 * User-editable PaddleOCR endpoint, credential-reference, timeout, and runtime configuration.
 * The token value is stored by the DSH credential provider and never appears in this schema.
 */
import { type CredentialRef } from '@deepseek-ai/dsh-credentials';
import type Schema from '@deepseek-ai/schemastery';
/** Settings namespace owned by this plugin. */
export declare const PADDLEOCR_SETTINGS_NAMESPACE: import("@deepseek-ai/dsh-settings").SettingsNamespace;
export declare const DEFAULT_CREDENTIAL_REF = "PADDLEOCR_ACCESS_TOKEN";
export declare const DEFAULT_TIMEOUT_SECONDS = 120;
export declare const DEFAULT_RESULT_DIRECTORY = ".dsh-paddleocr/results";
export declare const DEFAULT_UV_PATH = "uv";
/** Composition and Settings document form. */
export interface PaddleOCRConfig {
    /** Full PaddleOCR OCR endpoint ending with `/ocr`; blank means unconfigured. */
    ocrApiUrl?: string;
    /** Full PaddleOCR layout endpoint ending with `/layout-parsing`; blank means unconfigured. */
    docParsingApiUrl?: string;
    /** DSH credential reference containing the PaddleOCR access token. */
    credential?: string;
    /** OCR request timeout in seconds. */
    ocrTimeoutSeconds?: number;
    /** Document parsing request timeout in seconds. */
    docParsingTimeoutSeconds?: number;
    /** `uv` executable name or absolute path. */
    uvPath?: string;
    /** Workspace-relative directory for raw JSON results. */
    resultDirectory?: string;
}
/** Runtime-ready configuration with defaults materialized. */
export interface ResolvedPaddleOCRConfig {
    ocrApiUrl: string;
    docParsingApiUrl: string;
    credential: CredentialRef;
    ocrTimeoutSeconds: number;
    docParsingTimeoutSeconds: number;
    uvPath: string;
    resultDirectory: string;
}
/** Schemastery configuration surfaced through Cordis and DSH Settings. */
export declare const Config: Schema<PaddleOCRConfig>;
/** Validate and materialize one configuration generation. */
export declare function resolveConfig(config?: PaddleOCRConfig): ResolvedPaddleOCRConfig;
//# sourceMappingURL=config.d.ts.map