# dsh-PaddleOCR-Skills

English | [简体中文](README.zh-CN.md)

A native DeepSeek Harness bundle adapted from [PaddleOCR-Skills](https://github.com/Aidenwu0209/PaddleOCR-Skills). It ships two native tools, two skills, and a dedicated **Settings → PaddleOCR** GUI.

## Included

- `paddleocr_text_recognition` for image/PDF text extraction.
- `paddleocr_doc_parsing` for layout, tables, Markdown, and document structure.
- GUI fields for both endpoints, timeouts, `uv`, result storage, and a DSH Credential reference.
- A visible, clickable [PaddleOCR official website](https://www.paddleocr.com) link, plus direct API-token and official-documentation links in the GUI.
- Tokens stored through DSH Credentials and never returned to the browser.
- Real-path workspace containment for local inputs.
- Auditable raw JSON results under `.dsh-paddleocr/results/` by default.

## Install

Requires Node.js 22.19+, DeepSeek Harness, Python 3.9+, and [`uv`](https://docs.astral.sh/uv/).

### One-prompt installation (easiest)

Copy the entire prompt below into a terminal-capable AI agent:

```text
Install the DeepSeek Harness GUI plugin from https://github.com/Aidenwu0209/dsh-PaddleOCR-Skills on this computer.
1. Check Node.js 22.19+, Python 3.9+, npx, and uv. If something is missing, explain it and use its official installer. Do not use sudo or change unrelated settings without my permission.
2. Run: npx @deepseek-ai/dsh plugin --profile web add "github:Aidenwu0209/dsh-PaddleOCR-Skills#main"
3. Start npx @deepseek-ai/dsh web, wait for the actual local Web URL, and open it.
4. Verify that Settings → PaddleOCR exists and displays clickable links to https://www.paddleocr.com, the API-token page, and the official API documentation.
5. Do not invent, expose, or log my token. Stop at the credential fields and tell me exactly which HTTPS endpoints and token are still required.
6. Do not claim success until the plugin command succeeds, the Web URL responds, and the Settings panel is visible. Report the commands, versions, URL, and verification result.
```

From OpenClaw, install the repository-specific setup guide with:

```bash
openclaw skills install @aidenwu0209/dsh-paddleocr-skills-setup
```

This guides installation into DeepSeek Harness; it does not misrepresent the
DSH bundle as an OpenClaw code plugin.

```bash
npx @deepseek-ai/dsh plugin --profile web add "github:Aidenwu0209/dsh-PaddleOCR-Skills#main"
npx @deepseek-ai/dsh web
```

Built `lib/` artifacts are committed, so GitHub installation does not require dependency build-script approval.

Open **Settings → PaddleOCR**. The panel at the top links directly to the PaddleOCR website, the API-token page, and the official API documentation. Then enter the full HTTPS endpoints ending in `/ocr` and `/layout-parsing`, keep or change the default `PADDLEOCR_ACCESS_TOKEN` credential reference, enter the token, and save. Either endpoint may be left blank when only one tool is needed.

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
