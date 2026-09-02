# DSH compatibility evidence

This document records disposable-profile evidence for
`dsh-paddleocr-skills@0.1.2`. It is compatibility evidence for the declared DSH
versions, not an independent security audit and not proof of a real user's
Profile or PaddleOCR credentials.

## Verified matrix

Tested on 2026-09-02 with macOS 27.0 arm64, Node.js 22.23.1, pnpm 11.7.0,
Python 3.9.6, and uv 0.11.3.

| DSH release | Install | Config composition | Cold Web start | Settings route | Uninstall |
| --- | --- | --- | --- | --- | --- |
| `0.1.2-alpha.3` | passed | passed | passed | passed | passed |
| `0.1.2-alpha.4` | passed | passed | passed | passed | passed |
| `0.1.2-alpha.5` | passed | passed | passed | passed | passed |

For each release, the acceptance run:

1. created a new temporary `DSH_HOME` before the first CLI invocation;
2. installed this repository into the disposable `web` Profile with the
   matching official `@deepseek-ai/dsh` CLI;
3. required `--dump-config` to contain the plugin-owned `paddleocr-skills`
   entry;
4. cold-started DSH Web on loopback with an OS-assigned port;
5. required the authenticated Web root and `/_dsh/paddleocr/settings` to return
   HTTP 200, and required the Settings snapshot to report plugin version
   `0.1.2`;
6. removed `dsh-paddleocr-skills` through the official CLI and required both
   the Profile dependency and composed Patch entry to be absent.

The loopback processes were stopped after each run. No existing DSH Profile was
read or modified. The checks did not call the external PaddleOCR API because
that requires user-owned endpoints, credentials, and test data.

The corresponding machine-readable build-dsh-plugin evidence input is
[`evidence/dsh-profile-audit-2026-09-02.json`](evidence/dsh-profile-audit-2026-09-02.json).

## Reproduction outline

Run the following once per exact release, replacing `<release>` with one of the
versions in the table and `<repository>` with an absolute path to this checkout:

```bash
export DSH_HOME="$(mktemp -d)"
pnpm --package "@deepseek-ai/dsh@<release>" dlx dsh plugin --profile web add <repository>
pnpm --package "@deepseek-ai/dsh@<release>" dlx dsh --profile web --dump-config
pnpm --package "@deepseek-ai/dsh@<release>" dlx dsh --profile web --no-open --host 127.0.0.1 --port 0
pnpm --package "@deepseek-ai/dsh@<release>" dlx dsh plugin --profile web remove dsh-paddleocr-skills
```

The start command is intentionally foregrounded above so its one-time URL can
be inspected. Stop it before running the uninstall command. Never point this
procedure at a real `DSH_HOME`.
