/**
 * Design review helper. Renders the running dev server at a fixed desktop
 * size after a real delay, so entrance animations have finished.
 *
 * node scripts/shot.mjs <name> [waitSeconds] [actions]
 *
 * `actions` is a comma separated list of click selectors, each followed by an
 * optional wait, for example: "button[aria-label='Open Olivy']:1.2"
 */
import { mkdirSync } from 'node:fs'
import puppeteer from 'puppeteer-core'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const OUT = '/tmp/olivy-shots'
const [name = 'shot', waitArg = '6', actionsArg = '', urlPath = '/'] = process.argv.slice(2)
const width = Number(process.env.W || 1440)
const height = Number(process.env.H || 900)

mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--force-device-scale-factor=2', '--hide-scrollbars', '--font-render-hinting=none'],
  defaultViewport: { width, height, deviceScaleFactor: 2 },
})

const page = await browser.newPage()
await page.goto(`http://localhost:5180${urlPath}`, { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, Number(waitArg) * 1000))

for (const raw of actionsArg.split('|').filter(Boolean)) {
  const idx = raw.lastIndexOf('::')
  const target = idx === -1 ? raw : raw.slice(0, idx)
  const pause = idx === -1 ? 1 : Number(raw.slice(idx + 2))
  try {
    if (target.startsWith('key:')) await page.keyboard.press(target.slice(4))
    else await page.click(target)
  } catch (err) {
    console.error(`action failed: ${target} (${err.message})`)
  }
  await new Promise((r) => setTimeout(r, pause * 1000))
}

const file = `${OUT}/${name}.png`
await page.screenshot({ path: file })
await browser.close()
console.log(file)
