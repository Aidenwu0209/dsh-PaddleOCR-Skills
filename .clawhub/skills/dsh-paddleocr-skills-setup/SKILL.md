---
name: dsh-paddleocr-skills-setup
description: Install, launch, configure, and verify the Aidenwu0209/dsh-PaddleOCR-Skills native DeepSeek Harness bundle. Use when a user wants PaddleOCR text recognition and document parsing with the DSH Settings GUI and native tools.
license: MIT-0
metadata:
  author: Aidenwu0209
  repository: https://github.com/Aidenwu0209/dsh-PaddleOCR-Skills
  version: "1.0.0"
  openclaw:
    emoji: "🛠️"
    homepage: https://github.com/Aidenwu0209/dsh-PaddleOCR-Skills
---

# Set up DSH PaddleOCR Skills

Install the native DeepSeek Harness bundle. Do not present it as an OpenClaw
code plugin; this setup skill guides installation into DSH.

## Install and launch

1. Check Node.js 22.19+, Python 3.9+, `npx`, and `uv`. Explain any missing
   prerequisite before using its official installer. Do not use `sudo` or
   change unrelated settings without permission.
2. Run:

   ```bash
   npx @deepseek-ai/dsh plugin --profile web add "github:Aidenwu0209/dsh-PaddleOCR-Skills#main"
   npx @deepseek-ai/dsh web
   ```

3. Wait for the real local Web URL, open it, and confirm that **Settings →
   PaddleOCR** is visible.
4. Confirm the settings panel links to https://www.paddleocr.com, the API-token
   page, and official API documentation.

## Configure safely

- Ask the user for the HTTPS `/ocr` and `/layout-parsing` endpoints they need.
- Store the token through the DSH Credential field; never echo, log, or place it
  in ordinary settings or source files.
- Confirm `uv`, the selected endpoint, and credential status in the GUI.
- Do not claim success unless the plugin install succeeded, the Web URL
  responded, and the Settings panel was actually visible.

Report prerequisite versions, commands, the Web URL, visible configuration
status, and any values still required from the user.
