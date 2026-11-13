import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import { analyzeBrand, fetchSiteText, generateMatchForSite, readGenerated } from './gemini.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

/** Load .env without adding a dependency. */
function loadEnv() {
  const path = join(root, '.env')
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i < 0) continue
    const k = t.slice(0, i).trim()
    const v = t.slice(i + 1).trim()
    if (!process.env[k]) process.env[k] = v
  }
}

loadEnv()

const app = express()
const PORT = Number(process.env.PORT || 3001)

app.use(cors())
app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    hasKey: Boolean(process.env.GEMINI_API_KEY),
    captionModel: 'gemini-3.8-flash',
    imageModel: 'gemini-3.1-flash-image (Nano Banana 2)',
  })
})

app.get('/generated/:file', (req, res) => {
  const buf = readGenerated(req.params.file)
  if (!buf) {
    res.status(404).end()
    return
  }
  const ext = req.params.file.split('.').pop()?.toLowerCase()
  res.type(ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png').send(buf)
})

/**
 * Real onboard: analyze site → caption A/B rounds → Nano Banana images.
 * Can take 30–90s depending on image count.
 */
app.post('/api/onboard', async (req, res) => {
  const site = String(req.body?.site || 'luminaskin.com').trim()
  try {
    const started = Date.now()
    const data = await generateMatchForSite(site)
    res.json({ ...data, ms: Date.now() - started })
  } catch (err) {
    console.error('[onboard]', err)
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Generation failed',
    })
  }
})

app.post('/api/analyze', async (req, res) => {
  const site = String(req.body?.site || '').trim()
  try {
    const brand = await analyzeBrand(site, await fetchSiteText(site))
    res.json({ brand })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Analyze failed' })
  }
})

app.listen(PORT, () => {
  console.log(`Olivy API on http://localhost:${PORT}`)
  console.log(`Key loaded: ${process.env.GEMINI_API_KEY ? 'yes' : 'NO'}`)
})
