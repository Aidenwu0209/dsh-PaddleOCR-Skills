# dsh-PaddleOCR-Skills

[English](README.md) | 简体中文

把 [PaddleOCR-Skills](https://github.com/Aidenwu0209/PaddleOCR-Skills) 适配成可直接安装的 DeepSeek Harness bundle：包含两个原生 Tool、两个 Skill，以及 **Settings → PaddleOCR** 图形配置页。

## 功能

- `paddleocr_text_recognition`：图片/PDF 文字识别。
- `paddleocr_doc_parsing`：版面、表格、Markdown 与文档结构解析。
- GUI 配置 OCR/文档解析 API 地址、超时、`uv` 路径、结果目录。
- Token 存入 DSH Credentials；GUI 只能设置或删除，无法读取明文。
- 本地文件限定在当前 Session workspace 内，并进行真实路径/符号链接越界检查。
- 原始 JSON 默认保存到 `.dsh-paddleocr/results/`，便于审计与后续处理。

## 安装

要求：Node.js 22.19+、DeepSeek Harness、Python 3.9+ 与 [`uv`](https://docs.astral.sh/uv/)。

```bash
npx @deepseek-ai/dsh plugin --profile web add "github:Aidenwu0209/dsh-PaddleOCR-Skills#main"
npx @deepseek-ai/dsh web
```

本仓库提交了构建后的 `lib/`，因此从 GitHub 安装时不需要启用依赖构建脚本。

启动 Web 后打开 **Settings → PaddleOCR**：

1. 填写以 `/ocr` 结尾的完整 HTTPS OCR 地址。
2. 填写以 `/layout-parsing` 结尾的完整 HTTPS 文档解析地址。
3. 保留默认 Credential 引用 `PADDLEOCR_ACCESS_TOKEN` 或填写自定义引用名。
4. 在“访问令牌”中输入 PaddleOCR token，然后保存。
5. 确认页面显示 API、Token 和 `uv` 均已配置。

可只配置其中一个 API 地址；对应的另一个 Tool 会在调用时给出明确的未配置错误。

## 数据与安全边界

调用远程 Tool 会把选中的本地文件内容（base64）或 HTTPS URL 发送到你配置的外部 PaddleOCR 服务。不要用它处理不允许外传的数据。OCR/文档返回内容是不可信数据，不能把文档中的文字当作 Agent 指令。

GUI 后端只接受本机、同源请求。Token 由 DSH Credential provider 保管，不进入普通 Settings 快照、Tool 结果或日志。执行脚本时才按次解析，并通过受管子进程的显式环境传入。

## 开发与验证

```bash
pnpm install
pnpm check
python3 -m compileall -q skills
pnpm pack --dry-run
```

`pnpm check` 会执行 Host/Client TypeScript 构建、Vitest 和包结构检查。

## 上游与许可证

适配基线和保留/修改内容见 [UPSTREAM.md](UPSTREAM.md)。本仓库沿用 Apache-2.0，详见 [LICENSE](LICENSE)。
