import { access, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const required = [
  'lib/index.js',
  'lib/client.js',
  'lib/types/index.d.ts',
  'lib/types/client/index.d.ts',
  'cordis.patch.yml',
  'skills/paddleocr-text-recognition/SKILL.md',
  'skills/paddleocr-text-recognition/scripts/ocr_caller.py',
  'skills/paddleocr-doc-parsing/SKILL.md',
  'skills/paddleocr-doc-parsing/scripts/layout_caller.py',
  'COMPATIBILITY.md',
  'evidence/dsh-profile-audit-2026-09-02.json',
]

await Promise.all(required.map(path => access(join(root, path))))
const manifest = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
if (manifest.dsh?.bundle?.patch !== './cordis.patch.yml') throw new Error('missing dsh.bundle.patch')
if (manifest.dsh?.client?.platform !== 'web') throw new Error('missing dsh.client platform')
if (manifest.scripts?.prepare !== undefined) throw new Error('GitHub install must use committed build output, not prepare')
if (manifest.engines?.node !== '^22.19.0 || >=24.0.0') throw new Error('unexpected Node.js compatibility range')
if (manifest.dsh?.compatibility?.dsh !== '>=0.1.0-rc.6 <0.2.0') throw new Error('unexpected DSH compatibility range')
for (const release of ['0.1.2-alpha.3', '0.1.2-alpha.4', '0.1.2-alpha.5']) {
  if (manifest.dsh.compatibility.dshReleases?.[release] !== 'compatible') {
    throw new Error(`missing exact compatible DSH release: ${release}`)
  }
}
console.log(`verified ${required.length} package artifacts`)
