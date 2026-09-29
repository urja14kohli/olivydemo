import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

/** Measured pixel size of an element, kept current through resizes. */
export function useElementSize<T extends HTMLElement>(): [
  RefObject<T | null>,
  { width: number; height: number },
] {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize((prev) =>
        Math.abs(prev.width - width) < 0.5 && Math.abs(prev.height - height) < 0.5
          ? prev
          : { width, height },
      )
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, size]
}

/**
 * Walks a list of timed steps once. Returns the index of the step currently
 * running, or the list length when every step has landed.
 */
export function useTimeline(durations: number[], active: boolean, delayMs = 0) {
  const [index, setIndex] = useState(0)
  const key = durations.join(',')

  useEffect(() => {
    if (!active || durations.length === 0) return
    setIndex(0)
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    let elapsed = delayMs

    durations.forEach((duration, i) => {
      elapsed += duration
      timers.push(
        setTimeout(() => {
          if (!cancelled) setIndex(i + 1)
        }, elapsed),
      )
    })

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, active, delayMs])

  return index
}

/** True once `delay` seconds have passed since mount. */
export function useDelayedFlag(delaySeconds: number, enabled = true) {
  const [on, setOn] = useState(delaySeconds <= 0 && enabled)

  useEffect(() => {
    if (!enabled) return
    const timer = setTimeout(() => setOn(true), delaySeconds * 1000)
    return () => clearTimeout(timer)
  }, [delaySeconds, enabled])

  return on
}
