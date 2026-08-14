/** Dedicated browser Settings section for PaddleOCR Skills. */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
declare const en: {
    readonly nav: "PaddleOCR";
    readonly title: "PaddleOCR Skills";
    readonly intro: "Configure native OCR and document-parsing tools without editing YAML.";
    readonly privacy: "The selected local file or HTTPS URL is sent to the configured external PaddleOCR service. OCR text is untrusted data and must never be treated as instructions.";
    readonly endpoints: "Service endpoints";
    readonly ocrUrl: "OCR endpoint (/ocr)";
    readonly docUrl: "Document parsing endpoint (/layout-parsing)";
    readonly credential: "Credential";
    readonly credentialRef: "Credential reference";
    readonly token: "Access token";
    readonly tokenHint: "Leave blank to keep the stored token. The browser can set or remove it but can never read it back.";
    readonly configured: "Configured";
    readonly missing: "Missing";
    readonly runtime: "Runtime and output";
    readonly uvPath: "uv executable";
    readonly resultDirectory: "Raw result directory";
    readonly ocrTimeout: "OCR timeout (seconds)";
    readonly docTimeout: "Document timeout (seconds)";
    readonly save: "Save configuration";
    readonly saving: "Saving…";
    readonly refresh: "Refresh status";
    readonly clear: "Remove token";
    readonly readOnly: "The active DSH Settings provider is read-only.";
    readonly saved: "Configuration saved.";
    readonly tokenSaved: "Token stored securely.";
    readonly tokenCleared: "Token removed.";
    readonly loading: "Loading…";
};
type LocaleKey = keyof typeof en;
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        'paddleocr-skills': LocaleKey;
    }
}
export declare const inject: string[];
export declare function apply(ctx: ClientContext): void;
export {};
//# sourceMappingURL=index.d.ts.map