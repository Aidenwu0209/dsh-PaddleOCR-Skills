# dsh-PaddleOCR-Skills

English | [简体中文](README.zh-CN.md)

A native DeepSeek Harness bundle adapted from [PaddleOCR-Skills](https://github.com/Aidenwu0209/PaddleOCR-Skills). It ships two native tools, two skills, and a dedicated **Settings → PaddleOCR** GUI.

## Included

- `paddleocr_text_recognition` for image/PDF text extraction.
- `paddleocr_doc_parsing` for layout, tables, Markdown, and document structure.
- GUI fields for both endpoints, timeouts, `uv`, result storage, and a DSH Credential reference.
- Tokens stored through DSH Credentials and never returned to the browser.
- Real-path workspace containment for local inputs.
- Auditable raw JSON results under `.dsh-paddleocr/results/` by default.

## Install

Requires Node.js 22.19+, DeepSeek Harness, Python 3.9+, and [`uv`](https://docs.astral.sh/uv/).

```bash
npx @deepseek-ai/dsh plugin --profile web add "github:Aidenwu0209/dsh-PaddleOCR-Skills#main"
npx @deepseek-ai/dsh web
```

Built `lib/` artifacts are committed, so GitHub installation does not require dependency build-script approval.

Open **Settings → PaddleOCR**, enter the full HTTPS endpoints ending in `/ocr` and `/layout-parsing`, keep or change the default `PADDLEOCR_ACCESS_TOKEN` credential reference, enter the token, and save. Either endpoint may be left blank when only one tool is needed.

## Data boundary

Remote tool calls send the selected local file bytes (base64) or HTTPS URL to the externally configured PaddleOCR service. Do not use the plugin for data that is not allowed to leave the workspace. OCR and document content is untrusted data and must never be followed as agent instructions.

The local same-origin GUI may set or remove the token but cannot read it. The host resolves the credential per operation and passes it only through an explicit managed-subprocess environment.

## Development

```bash
pnpm install
pnpm check
python3 -m compileall -q skills
pnpm pack --dry-run
```

See [UPSTREAM.md](UPSTREAM.md) for provenance. Licensed under [Apache-2.0](LICENSE).
