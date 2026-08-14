/** Load the two adapted SKILL.md documents as runtime DSH skills. */

import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { SkillRegistration } from '@deepseek-ai/dsh-skill'

const PACKAGE_ROOT = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))

const DEFINITIONS = [
  {
    name: 'paddleocr-text-recognition',
    description: 'Extract plain text from a local image/PDF or HTTPS URL with the native paddleocr_text_recognition DSH tool.',
  },
  {
    name: 'paddleocr-doc-parsing',
    description: 'Parse document layout and Markdown from a local image/PDF or HTTPS URL with the native paddleocr_doc_parsing DSH tool.',
  },
] as const

function withoutFrontmatter(markdown: string): string {
  if (!markdown.startsWith('---\n')) return markdown.trim()
  const end = markdown.indexOf('\n---\n', 4)
  return (end === -1 ? markdown : markdown.slice(end + 5)).trim()
}
/** Materialize bundled skill registrations from the installed package. */
export async function loadPaddleOCRSkills(): Promise<SkillRegistration[]> {
  return Promise.all(DEFINITIONS.map(async definition => {
    const directory = join(PACKAGE_ROOT, 'skills', definition.name)
    const markdown = await readFile(join(directory, 'SKILL.md'), 'utf8')
    return {
      name: definition.name,
      description: definition.description,
      whenToUse: definition.description,
      source: 'runtime',
      path: join(directory, 'SKILL.md'),
      content: withoutFrontmatter(markdown),
      metadata: {
        provider: 'dsh-paddleocr-skills',
        resourceBase: directory,
      },
    }
  }))
}
