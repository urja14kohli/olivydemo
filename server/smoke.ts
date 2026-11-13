import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { GoogleGenAI } from '@google/genai'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const envPath = join(root, '.env')
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const i = t.indexOf('=')
    if (i < 0) continue
    process.env[t.slice(0, i).trim()] ??= t.slice(i + 1).trim()
  }
}

async function main() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  console.log('key prefix:', process.env.GEMINI_API_KEY?.slice(0, 6))

  const text = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: 'Reply with exactly: ok',
  })
  console.log('caption model:', text.text)

  try {
    const interaction = await ai.interactions.create({
      model: 'gemini-3.1-flash-image',
      input: 'A simple white ceramic cup on a wooden table, soft daylight, photoreal, no text',
    })
    console.log('interactions keys:', Object.keys(interaction as object))
    console.log('has output_image:', Boolean((interaction as { output_image?: unknown }).output_image))
    const oi = (interaction as { output_image?: { data?: string } }).output_image
    console.log('image bytes:', oi?.data ? Buffer.from(oi.data, 'base64').length : 0)
  } catch (e) {
    console.log('interactions error:', e instanceof Error ? e.message : e)
    try {
      const img = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image',
        contents: 'A simple white ceramic cup on a wooden table, soft daylight, photoreal, no text',
        config: {
          // @ts-expect-error modalities
          responseModalities: ['TEXT', 'IMAGE'],
        },
      })
      const parts = img.candidates?.[0]?.content?.parts ?? []
      console.log(
        'generateContent parts:',
        parts.map((p) => Object.keys(p)),
      )
    } catch (e2) {
      console.log('generateContent image error:', e2 instanceof Error ? e2.message : e2)
    }
  }
}

main()
