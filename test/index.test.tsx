import { createRoot } from 'solid-js'
import { isServer } from 'solid-js/web'
import { describe, expect, it } from 'vitest'
import { Panel, PanelGroup } from '../src'

describe('environment', () => {
  it('runs on client', () => {
    expect(typeof window).toBe('object')
    expect(isServer).toBe(false)
  })
})

describe('PanelGroup', () => {
  it('renders correctly', () => {
    createRoot(() => {
      const container = (
        <PanelGroup direction="horizontal">
          <Panel id="p1" defaultSize={50}>
            <div>Panel 1</div>
          </Panel>
          <Panel id="p2" defaultSize={50}>
            <div>Panel 2</div>
          </Panel>
        </PanelGroup>
      ) as HTMLDivElement
      
      expect(container.classList.contains('panel-group')).toBe(true)
      expect(container.classList.contains('horizontal')).toBe(true)
      expect(container.children.length).toBe(2)
    })
  })
})
