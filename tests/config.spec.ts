import { describe, expect, it } from 'vitest'
import { resolveConfig } from '../src/config.js'

describe('resolveConfig', () => {
  it('materializes safe defaults', () => {
    const value = resolveConfig()
    expect(value).toMatchObject({
      ocrApiUrl: '', docParsingApiUrl: '', ocrTimeoutSeconds: 120,
      docParsingTimeoutSeconds: 120, uvPath: 'uv', resultDirectory: '.dsh-paddleocr/results',
    })
    expect(String(value.credential)).toBe('PADDLEOCR_ACCESS_TOKEN')
  })

  it('accepts complete HTTPS endpoints', () => {
    expect(resolveConfig({
      ocrApiUrl: 'https://example.test/api/ocr/',
      docParsingApiUrl: 'https://example.test/api/layout-parsing/',
    })).toMatchObject({
      ocrApiUrl: 'https://example.test/api/ocr',
      docParsingApiUrl: 'https://example.test/api/layout-parsing',
    })
  })

  it.each([
    [{ ocrApiUrl: 'http://example.test/ocr' }, /https/],
    [{ docParsingApiUrl: 'https://example.test/layout' }, /layout-parsing/],
    [{ resultDirectory: '../escape' }, /inside/],
    [{ ocrTimeoutSeconds: 0 }, /between 1 and 3600/],
  ])('rejects unsafe configuration %j', (input, pattern) => {
    expect(() => resolveConfig(input)).toThrow(pattern)
  })
})
