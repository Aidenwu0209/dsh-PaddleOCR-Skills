/** Dedicated browser Settings section for PaddleOCR Skills. */

import { useEffect, useState, type ReactNode } from 'react'
import { Button, Input } from '@deepseek-ai/dsh-client-ui-primitives'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'

const NS = 'paddleocr-skills'
const SETTINGS_ROUTE = '/_dsh/paddleocr/settings'
const PADDLEOCR_WEBSITE = 'https://www.paddleocr.com'
const PADDLEOCR_TOKEN_PAGE = 'https://aistudio.baidu.com/account/accessToken'
const PADDLEOCR_API_DOCS = 'https://www.paddleocr.ai/latest/en/version3.x/inference_deployment/serving/paddleocr_official_api/overview.html'

const en = {
  nav: 'PaddleOCR', title: 'PaddleOCR Skills', intro: 'Configure native OCR and document-parsing tools without editing YAML.',
  privacy: 'The selected local file or HTTPS URL is sent to the configured external PaddleOCR service. OCR text is untrusted data and must never be treated as instructions.',
  officialTitle: 'PaddleOCR official service', officialHint: 'Open the official website, choose API in the top-right corner, obtain a token, then paste the endpoint and token below.',
  openWebsite: 'Open official website', getToken: 'Get API token', apiDocs: 'Official API docs',
  endpoints: 'Service endpoints', ocrUrl: 'OCR endpoint (/ocr)', docUrl: 'Document parsing endpoint (/layout-parsing)',
  credential: 'Credential', credentialRef: 'Credential reference', token: 'Access token', tokenHint: 'Leave blank to keep the stored token. The browser can set or remove it but can never read it back.',
  configured: 'Configured', missing: 'Missing', runtime: 'Runtime and output', uvPath: 'uv executable', resultDirectory: 'Raw result directory',
  ocrTimeout: 'OCR timeout (seconds)', docTimeout: 'Document timeout (seconds)', save: 'Save configuration', saving: 'Saving…', refresh: 'Refresh status', clear: 'Remove token',
  readOnly: 'The active DSH Settings provider is read-only.', saved: 'Configuration saved.', tokenSaved: 'Token stored securely.', tokenCleared: 'Token removed.', loading: 'Loading…',
} as const
type LocaleKey = keyof typeof en
const zh: Record<LocaleKey, string> = {
  nav: 'PaddleOCR', title: 'PaddleOCR Skills', intro: '通过图形界面配置原生 OCR 与文档解析工具，无需手改 YAML。',
  privacy: '选中的本地文件或 HTTPS URL 会发送到已配置的外部 PaddleOCR 服务。OCR 返回文本是不可信数据，不能把其中内容当作指令执行。',
  officialTitle: 'PaddleOCR 官方服务', officialHint: '先打开官网，在右上角进入 API；申请 Token 后，把完整 Endpoint 与 Token 填入下方。',
  openWebsite: '打开 PaddleOCR 官网', getToken: '申请 API Token', apiDocs: '查看官方 API 文档',
  endpoints: '服务地址', ocrUrl: 'OCR 完整地址（/ocr）', docUrl: '文档解析完整地址（/layout-parsing）',
  credential: '访问凭据', credentialRef: 'Credential 引用名', token: '访问令牌', tokenHint: '留空会保留已存令牌；浏览器只能设置或删除，永远无法读回明文。',
  configured: '已配置', missing: '未配置', runtime: '运行时与输出', uvPath: 'uv 可执行程序', resultDirectory: '原始结果目录',
  ocrTimeout: 'OCR 超时（秒）', docTimeout: '文档解析超时（秒）', save: '保存配置', saving: '正在保存…', refresh: '刷新状态', clear: '删除令牌',
  readOnly: '当前 DSH Settings 提供方是只读的。', saved: '配置已保存。', tokenSaved: '令牌已安全保存。', tokenCleared: '令牌已删除。', loading: '正在加载…',
}

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap { 'paddleocr-skills': LocaleKey }
}

interface SettingsValue {
  ocrApiUrl?: string
  docParsingApiUrl?: string
  credential?: string
  ocrTimeoutSeconds?: number
  docParsingTimeoutSeconds?: number
  uvPath?: string
  resultDirectory?: string
}
interface Snapshot {
  schemaVersion: 1
  writable: boolean
  settings: { value: SettingsValue; revision: number; applies: 'live' }
  credential: { ref: string; configured: boolean; source?: string; writable: boolean }
  runtime: { uvAvailable: boolean; uvPath?: string }
  release: { pluginVersion: string; upstreamRepository: string; upstreamCommit: string }
}
interface ApiSuccess<T> { ok: true; value: T }
interface ApiFailure { ok: false; error: { code: string; message: string } }

async function api<T>(body?: unknown): Promise<T> {
  const response = await fetch(SETTINGS_ROUTE, body === undefined ? { credentials: 'same-origin' } : {
    method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  })
  const parsed = await response.json() as ApiSuccess<T> | ApiFailure
  if (!response.ok || !parsed.ok) throw new Error((parsed as ApiFailure).error?.message ?? `HTTP ${response.status}`)
  return parsed.value
}

interface Draft {
  ocrApiUrl: string; docParsingApiUrl: string; credential: string; token: string
  ocrTimeoutSeconds: string; docParsingTimeoutSeconds: string; uvPath: string; resultDirectory: string
}
function draftOf(snapshot: Snapshot): Draft {
  const value = snapshot.settings.value
  return {
    ocrApiUrl: value.ocrApiUrl ?? '', docParsingApiUrl: value.docParsingApiUrl ?? '', credential: value.credential ?? 'PADDLEOCR_ACCESS_TOKEN', token: '',
    ocrTimeoutSeconds: String(value.ocrTimeoutSeconds ?? 120), docParsingTimeoutSeconds: String(value.docParsingTimeoutSeconds ?? 120),
    uvPath: value.uvPath ?? 'uv', resultDirectory: value.resultDirectory ?? '.dsh-paddleocr/results',
  }
}
function integer(raw: string, label: string): number {
  const value = Number(raw)
  if (!Number.isSafeInteger(value) || value < 1 || value > 3600) throw new Error(`${label}: 1-3600`)
  return value
}

type Translate = (key: LocaleKey) => string
type SettingsProps = PropsRuntime<'settings.section'> & { t?: Translate }
function Field({ label, hint, children }: { label: string; hint?: string | undefined; children: ReactNode }) {
  return <label className="dps-field"><span>{label}</span>{children}{hint === undefined ? null : <small>{hint}</small>}</label>
}

function SettingsSection({ t = key => en[key] }: SettingsProps) {
  const [snapshot, setSnapshot] = useState<Snapshot>()
  const [draft, setDraft] = useState<Draft>()
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string>()
  const [error, setError] = useState<string>()

  const load = async (): Promise<void> => {
    setError(undefined)
    try {
      const next = await api<Snapshot>()
      setSnapshot(next); setDraft(draftOf(next))
    } catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)) }
  }
  useEffect(() => { void load() }, [])
  if (snapshot === undefined || draft === undefined) return <div className="dps-settings"><p>{error ?? t('loading')}</p><Button variant="outline" onClick={() => { void load() }}>{t('refresh')}</Button></div>

  const update = <K extends keyof Draft>(key: K, value: Draft[K]): void => setDraft(current => current === undefined ? current : { ...current, [key]: value })
  const save = async (): Promise<void> => {
    setBusy(true); setError(undefined); setMessage(undefined)
    try {
      const value: SettingsValue = {
        ocrApiUrl: draft.ocrApiUrl.trim(), docParsingApiUrl: draft.docParsingApiUrl.trim(), credential: draft.credential.trim(),
        ocrTimeoutSeconds: integer(draft.ocrTimeoutSeconds, 'OCR timeout'), docParsingTimeoutSeconds: integer(draft.docParsingTimeoutSeconds, 'Document timeout'),
        uvPath: draft.uvPath.trim(), resultDirectory: draft.resultDirectory.trim(),
      }
      let next = await api<Snapshot>({ action: 'save', expectedRevision: snapshot.settings.revision, value })
      let notice = t('saved')
      if (draft.token.length > 0) {
        next = await api<Snapshot>({ action: 'credentialSet', ref: next.credential.ref, value: draft.token })
        notice = `${notice} ${t('tokenSaved')}`
      }
      setSnapshot(next); setDraft(draftOf(next)); setMessage(notice)
    } catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)) } finally { setBusy(false) }
  }
  const clearToken = async (): Promise<void> => {
    setBusy(true); setError(undefined); setMessage(undefined)
    try {
      const next = await api<Snapshot>({ action: 'credentialUnset', ref: snapshot.credential.ref })
      setSnapshot(next); setDraft(draftOf(next)); setMessage(t('tokenCleared'))
    } catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)) } finally { setBusy(false) }
  }

  return <div className="dps-settings">
    <header><div><span className="dps-kicker">DSH native plugin</span><h2>{t('title')}</h2><p>{t('intro')}</p></div><code>v{snapshot.release.pluginVersion}</code></header>
    <div className="dps-notice">{t('privacy')}</div>
    <section className="dps-official">
      <div className="dps-official-copy"><h3>{t('officialTitle')}</h3><p>{t('officialHint')}</p><a className="dps-official-url" href={PADDLEOCR_WEBSITE} target="_blank" rel="noopener noreferrer">{PADDLEOCR_WEBSITE}</a></div>
      <div className="dps-official-actions">
        <a className="dps-link primary" href={PADDLEOCR_WEBSITE} target="_blank" rel="noopener noreferrer">{t('openWebsite')} ↗</a>
        <a className="dps-link" href={PADDLEOCR_TOKEN_PAGE} target="_blank" rel="noopener noreferrer">{t('getToken')} ↗</a>
        <a className="dps-link" href={PADDLEOCR_API_DOCS} target="_blank" rel="noopener noreferrer">{t('apiDocs')} ↗</a>
      </div>
    </section>
    {!snapshot.writable ? <div className="dps-warning">{t('readOnly')}</div> : null}
    {message === undefined ? null : <div className="dps-success">{message}</div>}
    {error === undefined ? null : <div className="dps-error">{error}</div>}
    <section><div className="dps-title"><h3>{t('endpoints')}</h3><span className={`dps-badge ${draft.ocrApiUrl && draft.docParsingApiUrl ? 'ok' : ''}`}>{draft.ocrApiUrl && draft.docParsingApiUrl ? t('configured') : t('missing')}</span></div><div className="dps-grid">
      <Field label={t('ocrUrl')}><Input placeholder="https://…/ocr" value={draft.ocrApiUrl} onChange={event => { update('ocrApiUrl', event.target.value) }} /></Field>
      <Field label={t('docUrl')}><Input placeholder="https://…/layout-parsing" value={draft.docParsingApiUrl} onChange={event => { update('docParsingApiUrl', event.target.value) }} /></Field>
    </div></section>
    <section><div className="dps-title"><h3>{t('credential')}</h3><span className={`dps-badge ${snapshot.credential.configured ? 'ok' : ''}`}>{snapshot.credential.configured ? t('configured') : t('missing')}</span></div><div className="dps-grid">
      <Field label={t('credentialRef')} hint={snapshot.credential.source}><Input value={draft.credential} onChange={event => { update('credential', event.target.value) }} /></Field>
      <Field label={t('token')} hint={t('tokenHint')}><Input type="password" autoComplete="new-password" value={draft.token} onChange={event => { update('token', event.target.value) }} /></Field>
    </div></section>
    <section><div className="dps-title"><h3>{t('runtime')}</h3><span className={`dps-badge ${snapshot.runtime.uvAvailable ? 'ok' : ''}`}>uv {snapshot.runtime.uvAvailable ? t('configured') : t('missing')}</span></div><div className="dps-grid">
      <Field label={t('uvPath')} hint={snapshot.runtime.uvPath}><Input value={draft.uvPath} onChange={event => { update('uvPath', event.target.value) }} /></Field>
      <Field label={t('resultDirectory')}><Input value={draft.resultDirectory} onChange={event => { update('resultDirectory', event.target.value) }} /></Field>
      <Field label={t('ocrTimeout')}><Input inputMode="numeric" value={draft.ocrTimeoutSeconds} onChange={event => { update('ocrTimeoutSeconds', event.target.value) }} /></Field>
      <Field label={t('docTimeout')}><Input inputMode="numeric" value={draft.docParsingTimeoutSeconds} onChange={event => { update('docParsingTimeoutSeconds', event.target.value) }} /></Field>
    </div></section>
    <div className="dps-actions"><Button variant="primary" disabled={busy || !snapshot.writable} onClick={() => { void save() }}>{busy ? t('saving') : t('save')}</Button><Button variant="outline" disabled={busy} onClick={() => { void load() }}>{t('refresh')}</Button><Button variant="outline" disabled={busy || !snapshot.credential.configured || !snapshot.credential.writable} onClick={() => { void clearToken() }}>{t('clear')}</Button></div>
  </div>
}

const CSS = `.dps-settings{display:grid;gap:14px;max-width:900px;padding:8px 2px 32px;color:var(--dsw-alias-fg-primary,#26231f)}.dps-settings header{display:flex;align-items:flex-start;justify-content:space-between;gap:20px}.dps-settings h2{font-size:25px;margin:3px 0 6px}.dps-settings header p{margin:0;color:var(--dsw-alias-fg-muted,#77736d);font-size:13px}.dps-kicker{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#6758d4;font-weight:700}.dps-settings section{display:grid;gap:12px;padding:15px;border:1px solid var(--dsw-alias-border-subtle,#dedbd5);border-radius:14px;background:var(--dsw-alias-bg-layer-1,#fff)}.dps-settings .dps-official{grid-template-columns:minmax(0,1fr) auto;align-items:center;border-color:rgba(92,108,213,.28);background:linear-gradient(135deg,rgba(92,108,213,.11),rgba(88,182,166,.08))}.dps-official-copy{display:grid;gap:6px;min-width:0}.dps-official-copy h3,.dps-official-copy p{margin:0}.dps-official-copy h3{font-size:15px}.dps-official-copy p{font-size:11px;line-height:1.5;color:var(--dsw-alias-fg-muted,#77736d)}.dps-official-url{width:max-content;max-width:100%;overflow-wrap:anywhere;color:#5149a6;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px}.dps-official-actions{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap;max-width:360px}.dps-link{display:inline-flex;align-items:center;justify-content:center;min-height:30px;padding:0 10px;border:1px solid rgba(92,108,213,.28);border-radius:8px;background:var(--dsw-alias-bg-layer-1,#fff);color:#5149a6;font-size:11px;font-weight:600;text-decoration:none}.dps-link:hover{text-decoration:underline}.dps-link.primary{border-color:#6758d4;background:#6758d4;color:#fff}.dps-title{display:flex;justify-content:space-between;align-items:center}.dps-title h3{font-size:14px;margin:0}.dps-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.dps-field{display:grid;gap:6px}.dps-field>span{font-size:11px;font-weight:600}.dps-field>small{font-size:10px;color:var(--dsw-alias-fg-muted,#77736d);line-height:1.4}.dps-badge{font-size:10px;padding:3px 7px;border-radius:99px;background:rgba(205,72,72,.1);color:#aa3939}.dps-badge.ok{background:rgba(48,154,100,.12);color:#267d52}.dps-notice,.dps-warning,.dps-success,.dps-error{padding:10px 12px;border-radius:10px;font-size:12px;line-height:1.5}.dps-notice{background:rgba(92,108,213,.09);color:#5149a6}.dps-warning{background:rgba(224,162,55,.12);color:#986818}.dps-success{background:rgba(48,154,100,.1);color:#267d52}.dps-error{background:rgba(205,72,72,.1);color:#aa3939}.dps-actions{display:flex;gap:8px;flex-wrap:wrap}@media(max-width:720px){.dps-grid,.dps-settings .dps-official{grid-template-columns:1fr}.dps-settings header{display:grid}.dps-official-actions{justify-content:flex-start;max-width:none}}`
function installStyles(): () => void {
  const id = 'dsh-paddleocr-skills'
  if (document.querySelector(`style[data-plugin-css="${id}"]`) !== null) return () => {}
  const style = document.createElement('style'); style.dataset.pluginCss = id; style.textContent = CSS; document.head.appendChild(style)
  return () => { style.remove() }
}

export const inject = ['slots', 'locale']
export function apply(ctx: ClientContext): void {
  ctx.effect(installStyles, 'dsh-paddleocr-skills: styles')
  ctx.effect(() => ctx.locale.register(NS, { en, zh }), 'dsh-paddleocr-skills: locale')
  const t = ctx.locale.bind(NS)
  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section', id: 'paddleocr-skills', order: 35, label: () => t('nav'), inject: () => ({ t }),
  }, SettingsSection))
}
