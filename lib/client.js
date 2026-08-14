window.__ModuleLoader__.load({ id: "dsh-paddleocr-skills", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
var import_jsx_runtime = require("react/jsx-runtime");
var NS = "paddleocr-skills";
var SETTINGS_ROUTE = "/_dsh/paddleocr/settings";
var PADDLEOCR_WEBSITE = "https://www.paddleocr.com";
var PADDLEOCR_TOKEN_PAGE = "https://aistudio.baidu.com/account/accessToken";
var PADDLEOCR_API_DOCS = "https://www.paddleocr.ai/latest/en/version3.x/inference_deployment/serving/paddleocr_official_api/overview.html";
var en = {
  nav: "PaddleOCR",
  title: "PaddleOCR Skills",
  intro: "Configure native OCR and document-parsing tools without editing YAML.",
  privacy: "The selected local file or HTTPS URL is sent to the configured external PaddleOCR service. OCR text is untrusted data and must never be treated as instructions.",
  officialTitle: "PaddleOCR official service",
  officialHint: "Open the official website, choose API in the top-right corner, obtain a token, then paste the endpoint and token below.",
  openWebsite: "Open official website",
  getToken: "Get API token",
  apiDocs: "Official API docs",
  endpoints: "Service endpoints",
  ocrUrl: "OCR endpoint (/ocr)",
  docUrl: "Document parsing endpoint (/layout-parsing)",
  credential: "Credential",
  credentialRef: "Credential reference",
  token: "Access token",
  tokenHint: "Leave blank to keep the stored token. The browser can set or remove it but can never read it back.",
  configured: "Configured",
  missing: "Missing",
  runtime: "Runtime and output",
  uvPath: "uv executable",
  resultDirectory: "Raw result directory",
  ocrTimeout: "OCR timeout (seconds)",
  docTimeout: "Document timeout (seconds)",
  save: "Save configuration",
  saving: "Saving\u2026",
  refresh: "Refresh status",
  clear: "Remove token",
  readOnly: "The active DSH Settings provider is read-only.",
  saved: "Configuration saved.",
  tokenSaved: "Token stored securely.",
  tokenCleared: "Token removed.",
  loading: "Loading\u2026"
};
var zh = {
  nav: "PaddleOCR",
  title: "PaddleOCR Skills",
  intro: "\u901A\u8FC7\u56FE\u5F62\u754C\u9762\u914D\u7F6E\u539F\u751F OCR \u4E0E\u6587\u6863\u89E3\u6790\u5DE5\u5177\uFF0C\u65E0\u9700\u624B\u6539 YAML\u3002",
  privacy: "\u9009\u4E2D\u7684\u672C\u5730\u6587\u4EF6\u6216 HTTPS URL \u4F1A\u53D1\u9001\u5230\u5DF2\u914D\u7F6E\u7684\u5916\u90E8 PaddleOCR \u670D\u52A1\u3002OCR \u8FD4\u56DE\u6587\u672C\u662F\u4E0D\u53EF\u4FE1\u6570\u636E\uFF0C\u4E0D\u80FD\u628A\u5176\u4E2D\u5185\u5BB9\u5F53\u4F5C\u6307\u4EE4\u6267\u884C\u3002",
  officialTitle: "PaddleOCR \u5B98\u65B9\u670D\u52A1",
  officialHint: "\u5148\u6253\u5F00\u5B98\u7F51\uFF0C\u5728\u53F3\u4E0A\u89D2\u8FDB\u5165 API\uFF1B\u7533\u8BF7 Token \u540E\uFF0C\u628A\u5B8C\u6574 Endpoint \u4E0E Token \u586B\u5165\u4E0B\u65B9\u3002",
  openWebsite: "\u6253\u5F00 PaddleOCR \u5B98\u7F51",
  getToken: "\u7533\u8BF7 API Token",
  apiDocs: "\u67E5\u770B\u5B98\u65B9 API \u6587\u6863",
  endpoints: "\u670D\u52A1\u5730\u5740",
  ocrUrl: "OCR \u5B8C\u6574\u5730\u5740\uFF08/ocr\uFF09",
  docUrl: "\u6587\u6863\u89E3\u6790\u5B8C\u6574\u5730\u5740\uFF08/layout-parsing\uFF09",
  credential: "\u8BBF\u95EE\u51ED\u636E",
  credentialRef: "Credential \u5F15\u7528\u540D",
  token: "\u8BBF\u95EE\u4EE4\u724C",
  tokenHint: "\u7559\u7A7A\u4F1A\u4FDD\u7559\u5DF2\u5B58\u4EE4\u724C\uFF1B\u6D4F\u89C8\u5668\u53EA\u80FD\u8BBE\u7F6E\u6216\u5220\u9664\uFF0C\u6C38\u8FDC\u65E0\u6CD5\u8BFB\u56DE\u660E\u6587\u3002",
  configured: "\u5DF2\u914D\u7F6E",
  missing: "\u672A\u914D\u7F6E",
  runtime: "\u8FD0\u884C\u65F6\u4E0E\u8F93\u51FA",
  uvPath: "uv \u53EF\u6267\u884C\u7A0B\u5E8F",
  resultDirectory: "\u539F\u59CB\u7ED3\u679C\u76EE\u5F55",
  ocrTimeout: "OCR \u8D85\u65F6\uFF08\u79D2\uFF09",
  docTimeout: "\u6587\u6863\u89E3\u6790\u8D85\u65F6\uFF08\u79D2\uFF09",
  save: "\u4FDD\u5B58\u914D\u7F6E",
  saving: "\u6B63\u5728\u4FDD\u5B58\u2026",
  refresh: "\u5237\u65B0\u72B6\u6001",
  clear: "\u5220\u9664\u4EE4\u724C",
  readOnly: "\u5F53\u524D DSH Settings \u63D0\u4F9B\u65B9\u662F\u53EA\u8BFB\u7684\u3002",
  saved: "\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002",
  tokenSaved: "\u4EE4\u724C\u5DF2\u5B89\u5168\u4FDD\u5B58\u3002",
  tokenCleared: "\u4EE4\u724C\u5DF2\u5220\u9664\u3002",
  loading: "\u6B63\u5728\u52A0\u8F7D\u2026"
};
async function api(body) {
  const response = await fetch(SETTINGS_ROUTE, body === void 0 ? { credentials: "same-origin" } : {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const parsed = await response.json();
  if (!response.ok || !parsed.ok) throw new Error(parsed.error?.message ?? `HTTP ${response.status}`);
  return parsed.value;
}
function draftOf(snapshot) {
  const value = snapshot.settings.value;
  return {
    ocrApiUrl: value.ocrApiUrl ?? "",
    docParsingApiUrl: value.docParsingApiUrl ?? "",
    credential: value.credential ?? "PADDLEOCR_ACCESS_TOKEN",
    token: "",
    ocrTimeoutSeconds: String(value.ocrTimeoutSeconds ?? 120),
    docParsingTimeoutSeconds: String(value.docParsingTimeoutSeconds ?? 120),
    uvPath: value.uvPath ?? "uv",
    resultDirectory: value.resultDirectory ?? ".dsh-paddleocr/results"
  };
}
function integer(raw, label) {
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < 1 || value > 3600) throw new Error(`${label}: 1-3600`);
  return value;
}
function Field({ label, hint, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dps-field", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
    children,
    hint === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: hint })
  ] });
}
function SettingsSection({ t = (key) => en[key] }) {
  const [snapshot, setSnapshot] = (0, import_react.useState)();
  const [draft, setDraft] = (0, import_react.useState)();
  const [busy, setBusy] = (0, import_react.useState)(false);
  const [message, setMessage] = (0, import_react.useState)();
  const [error, setError] = (0, import_react.useState)();
  const load = async () => {
    setError(void 0);
    try {
      const next = await api();
      setSnapshot(next);
      setDraft(draftOf(next));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    }
  };
  (0, import_react.useEffect)(() => {
    void load();
  }, []);
  if (snapshot === void 0 || draft === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dps-settings", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error ?? t("loading") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { variant: "outline", onClick: () => {
      void load();
    }, children: t("refresh") })
  ] });
  const update = (key, value) => setDraft((current) => current === void 0 ? current : { ...current, [key]: value });
  const save = async () => {
    setBusy(true);
    setError(void 0);
    setMessage(void 0);
    try {
      const value = {
        ocrApiUrl: draft.ocrApiUrl.trim(),
        docParsingApiUrl: draft.docParsingApiUrl.trim(),
        credential: draft.credential.trim(),
        ocrTimeoutSeconds: integer(draft.ocrTimeoutSeconds, "OCR timeout"),
        docParsingTimeoutSeconds: integer(draft.docParsingTimeoutSeconds, "Document timeout"),
        uvPath: draft.uvPath.trim(),
        resultDirectory: draft.resultDirectory.trim()
      };
      let next = await api({ action: "save", expectedRevision: snapshot.settings.revision, value });
      let notice = t("saved");
      if (draft.token.length > 0) {
        next = await api({ action: "credentialSet", ref: next.credential.ref, value: draft.token });
        notice = `${notice} ${t("tokenSaved")}`;
      }
      setSnapshot(next);
      setDraft(draftOf(next));
      setMessage(notice);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setBusy(false);
    }
  };
  const clearToken = async () => {
    setBusy(true);
    setError(void 0);
    setMessage(void 0);
    try {
      const next = await api({ action: "credentialUnset", ref: snapshot.credential.ref });
      setSnapshot(next);
      setDraft(draftOf(next));
      setMessage(t("tokenCleared"));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dps-settings", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dps-kicker", children: "DSH native plugin" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("title") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("intro") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", { children: [
        "v",
        snapshot.release.pluginVersion
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dps-notice", children: t("privacy") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "dps-official", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dps-official-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("officialTitle") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("officialHint") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { className: "dps-official-url", href: PADDLEOCR_WEBSITE, target: "_blank", rel: "noopener noreferrer", children: PADDLEOCR_WEBSITE })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dps-official-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { className: "dps-link primary", href: PADDLEOCR_WEBSITE, target: "_blank", rel: "noopener noreferrer", children: [
          t("openWebsite"),
          " \u2197"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { className: "dps-link", href: PADDLEOCR_TOKEN_PAGE, target: "_blank", rel: "noopener noreferrer", children: [
          t("getToken"),
          " \u2197"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { className: "dps-link", href: PADDLEOCR_API_DOCS, target: "_blank", rel: "noopener noreferrer", children: [
          t("apiDocs"),
          " \u2197"
        ] })
      ] })
    ] }),
    !snapshot.writable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dps-warning", children: t("readOnly") }) : null,
    message === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dps-success", children: message }),
    error === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dps-error", children: error }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dps-title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("endpoints") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `dps-badge ${draft.ocrApiUrl && draft.docParsingApiUrl ? "ok" : ""}`, children: draft.ocrApiUrl && draft.docParsingApiUrl ? t("configured") : t("missing") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dps-grid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("ocrUrl"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { placeholder: "https://\u2026/ocr", value: draft.ocrApiUrl, onChange: (event) => {
          update("ocrApiUrl", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("docUrl"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { placeholder: "https://\u2026/layout-parsing", value: draft.docParsingApiUrl, onChange: (event) => {
          update("docParsingApiUrl", event.target.value);
        } }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dps-title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("credential") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `dps-badge ${snapshot.credential.configured ? "ok" : ""}`, children: snapshot.credential.configured ? t("configured") : t("missing") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dps-grid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("credentialRef"), hint: snapshot.credential.source, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { value: draft.credential, onChange: (event) => {
          update("credential", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("token"), hint: t("tokenHint"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { type: "password", autoComplete: "new-password", value: draft.token, onChange: (event) => {
          update("token", event.target.value);
        } }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dps-title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("runtime") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: `dps-badge ${snapshot.runtime.uvAvailable ? "ok" : ""}`, children: [
          "uv ",
          snapshot.runtime.uvAvailable ? t("configured") : t("missing")
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dps-grid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("uvPath"), hint: snapshot.runtime.uvPath, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { value: draft.uvPath, onChange: (event) => {
          update("uvPath", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("resultDirectory"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { value: draft.resultDirectory, onChange: (event) => {
          update("resultDirectory", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("ocrTimeout"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { inputMode: "numeric", value: draft.ocrTimeoutSeconds, onChange: (event) => {
          update("ocrTimeoutSeconds", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("docTimeout"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { inputMode: "numeric", value: draft.docParsingTimeoutSeconds, onChange: (event) => {
          update("docParsingTimeoutSeconds", event.target.value);
        } }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dps-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { variant: "primary", disabled: busy || !snapshot.writable, onClick: () => {
        void save();
      }, children: busy ? t("saving") : t("save") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { variant: "outline", disabled: busy, onClick: () => {
        void load();
      }, children: t("refresh") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { variant: "outline", disabled: busy || !snapshot.credential.configured || !snapshot.credential.writable, onClick: () => {
        void clearToken();
      }, children: t("clear") })
    ] })
  ] });
}
var CSS = `.dps-settings{display:grid;gap:14px;max-width:900px;padding:8px 2px 32px;color:var(--dsw-alias-fg-primary,#26231f)}.dps-settings header{display:flex;align-items:flex-start;justify-content:space-between;gap:20px}.dps-settings h2{font-size:25px;margin:3px 0 6px}.dps-settings header p{margin:0;color:var(--dsw-alias-fg-muted,#77736d);font-size:13px}.dps-kicker{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#6758d4;font-weight:700}.dps-settings section{display:grid;gap:12px;padding:15px;border:1px solid var(--dsw-alias-border-subtle,#dedbd5);border-radius:14px;background:var(--dsw-alias-bg-layer-1,#fff)}.dps-settings .dps-official{grid-template-columns:minmax(0,1fr) auto;align-items:center;border-color:rgba(92,108,213,.28);background:linear-gradient(135deg,rgba(92,108,213,.11),rgba(88,182,166,.08))}.dps-official-copy{display:grid;gap:6px;min-width:0}.dps-official-copy h3,.dps-official-copy p{margin:0}.dps-official-copy h3{font-size:15px}.dps-official-copy p{font-size:11px;line-height:1.5;color:var(--dsw-alias-fg-muted,#77736d)}.dps-official-url{width:max-content;max-width:100%;overflow-wrap:anywhere;color:#5149a6;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px}.dps-official-actions{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap;max-width:360px}.dps-link{display:inline-flex;align-items:center;justify-content:center;min-height:30px;padding:0 10px;border:1px solid rgba(92,108,213,.28);border-radius:8px;background:var(--dsw-alias-bg-layer-1,#fff);color:#5149a6;font-size:11px;font-weight:600;text-decoration:none}.dps-link:hover{text-decoration:underline}.dps-link.primary{border-color:#6758d4;background:#6758d4;color:#fff}.dps-title{display:flex;justify-content:space-between;align-items:center}.dps-title h3{font-size:14px;margin:0}.dps-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.dps-field{display:grid;gap:6px}.dps-field>span{font-size:11px;font-weight:600}.dps-field>small{font-size:10px;color:var(--dsw-alias-fg-muted,#77736d);line-height:1.4}.dps-badge{font-size:10px;padding:3px 7px;border-radius:99px;background:rgba(205,72,72,.1);color:#aa3939}.dps-badge.ok{background:rgba(48,154,100,.12);color:#267d52}.dps-notice,.dps-warning,.dps-success,.dps-error{padding:10px 12px;border-radius:10px;font-size:12px;line-height:1.5}.dps-notice{background:rgba(92,108,213,.09);color:#5149a6}.dps-warning{background:rgba(224,162,55,.12);color:#986818}.dps-success{background:rgba(48,154,100,.1);color:#267d52}.dps-error{background:rgba(205,72,72,.1);color:#aa3939}.dps-actions{display:flex;gap:8px;flex-wrap:wrap}@media(max-width:720px){.dps-grid,.dps-settings .dps-official{grid-template-columns:1fr}.dps-settings header{display:grid}.dps-official-actions{justify-content:flex-start;max-width:none}}`;
function installStyles() {
  const id = "dsh-paddleocr-skills";
  if (document.querySelector(`style[data-plugin-css="${id}"]`) !== null) return () => {
  };
  const style = document.createElement("style");
  style.dataset.pluginCss = id;
  style.textContent = CSS;
  document.head.appendChild(style);
  return () => {
    style.remove();
  };
}
var inject = ["slots", "locale"];
function apply(ctx) {
  ctx.effect(installStyles, "dsh-paddleocr-skills: styles");
  ctx.effect(() => ctx.locale.register(NS, { en, zh }), "dsh-paddleocr-skills: locale");
  const t = ctx.locale.bind(NS);
  ctx.slots.inject("settings.section", () => ctx.slots.register({
    name: "settings.section",
    id: "paddleocr-skills",
    order: 35,
    label: () => t("nav"),
    inject: () => ({ t })
  }, SettingsSection));
}
//# sourceMappingURL=index.js.map

return module.exports; } });
//# sourceMappingURL=client.js.map
