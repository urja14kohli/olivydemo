import type { Item, ItemState } from './lumina'

/** An item that needed a yes stops asking once its piece is approved. */
export function stateOf(item: Item, approved: Set<string>): ItemState | undefined {
  if (item.state === 'need' && item.approves && approved.has(item.approves)) return undefined
  return item.state
}
