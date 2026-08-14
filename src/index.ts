/** PaddleOCR Skills profile bundle for DeepSeek Harness. */

import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-credentials'
import type {} from '@deepseek-ai/dsh-settings'
import type {} from '@deepseek-ai/dsh-skill'
import type {} from '@deepseek-ai/dsh-subprocess'
import type {} from '@deepseek-ai/dsh-tools'
import {
  Config,
  PADDLEOCR_SETTINGS_NAMESPACE,
  resolveConfig,
  type PaddleOCRConfig,
} from './config.js'
import { loadPaddleOCRSkills } from './skills.js'
import { createPaddleOCRTools } from './tools.js'
import { installPaddleOCRWeb, PaddleOCRWebBackend } from './web.js'

export const name = 'dsh-paddleocr-skills'
export const inject = ['tools', 'credentials', 'skills', 'subprocess', 'settings']
export { Config }

/** Register live Settings, both skills, both native tools, and the optional Web editor. */
export async function apply(ctx: Context, config: PaddleOCRConfig = {}): Promise<() => void> {
  const settings = ctx.settings.register(PADDLEOCR_SETTINGS_NAMESPACE, Config, {
    base: config,
    applies: 'live',
    validate: value => { resolveConfig(value) },
  })
  const disposers: Array<() => void> = []
  try {
    for (const skill of await loadPaddleOCRSkills()) disposers.push(ctx.skills.register(skill))
    for (const tool of createPaddleOCRTools(ctx, () => resolveConfig(settings.get()))) disposers.push(ctx.tools.register(tool))
    installPaddleOCRWeb(ctx, new PaddleOCRWebBackend(ctx))
    ctx.logger.info('dsh-paddleocr-skills ready: 2 skills, 2 native tools, GUI Settings available in Web profile')
  } catch (error) {
    for (const dispose of disposers.reverse()) dispose()
    throw error
  }
  return () => { for (const dispose of disposers.reverse()) dispose() }
}
