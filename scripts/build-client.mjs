import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const root = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const compiledPath = join(root, '.client-build', 'index.js')
const outputPath = join(root, 'lib', 'client.js')

await build({
  entryPoints: [join(root, 'src', 'client', 'index.tsx')],
  outfile: compiledPath,
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2022',
  jsx: 'automatic',
  sourcemap: true,
  external: [
    'react',
    'react/jsx-runtime',
    '@deepseek-ai/dsh-client-runtime/client',
    '@deepseek-ai/dsh-client-ui-primitives',
    '@deepseek-ai/dsh-client-ui-settings/client',
    '@deepseek-ai/dsh-client-locale/client',
    '@deepseek-ai/dsh-client-ui-slots',
  ],
})

const source = await readFile(compiledPath, 'utf8')
const wrapped = [
  'window.__ModuleLoader__.load({ id: "dsh-paddleocr-skills", factory: (require) => {',
  'var module = { exports: {} }; var exports = module.exports;',
  source.replace(/\n?\/\/# sourceMappingURL=.*$/u, ''),
  'return module.exports; } });',
  '//# sourceMappingURL=client.js.map',
  '',
].join('\n')

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, wrapped)

const rawMap = JSON.parse(await readFile(`${compiledPath}.map`, 'utf8'))
rawMap.file = 'client.js'
rawMap.sources = rawMap.sources.map(sourcePath => `../src/client/${sourcePath.replace(/^\.\.\//u, '')}`)
await writeFile(`${outputPath}.map`, `${JSON.stringify(rawMap)}\n`)
await rm(join(root, '.client-build'), { recursive: true, force: true })
