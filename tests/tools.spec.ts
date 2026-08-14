import { mkdir, mkdtemp, realpath, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { resolveResultDirectory, resolveWorkspaceFile } from '../src/tools.js'

describe('workspace input containment', () => {
  it('accepts a regular file under the workspace', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-paddleocr-test-'))
    await mkdir(join(root, 'docs'))
    await writeFile(join(root, 'docs', 'page.png'), 'data')
    await expect(resolveWorkspaceFile(root, 'docs/page.png')).resolves.toBe(await realpath(join(root, 'docs', 'page.png')))
  })

  it('rejects a symlink that escapes the workspace', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-paddleocr-test-'))
    const outside = await mkdtemp(join(tmpdir(), 'dsh-paddleocr-outside-'))
    await writeFile(join(outside, 'secret.pdf'), 'data')
    await symlink(join(outside, 'secret.pdf'), join(root, 'escape.pdf'))
    await expect(resolveWorkspaceFile(root, 'escape.pdf')).rejects.toThrow(/inside/)
  })

  it('rejects a result-directory symlink that escapes the workspace', async () => {
    const root = await mkdtemp(join(tmpdir(), 'dsh-paddleocr-test-'))
    const outside = await mkdtemp(join(tmpdir(), 'dsh-paddleocr-results-'))
    await symlink(outside, join(root, 'results'))
    await expect(resolveResultDirectory(root, 'results')).rejects.toThrow(/inside/)
  })
})
