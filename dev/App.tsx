import type { Component } from 'solid-js'
import { Panel, PanelGroup, PanelResizeHandle } from 'src'
import 'src/styles/layout.css'

const App: Component = () => {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      "flex-direction": 'column',
      background: '#0f0f0f',
      color: '#e0e0e0',
      "font-family": 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'
    }}>
      <header style={{ 
        padding: '1rem 2rem', 
        background: '#1a1a1a', 
        "border-bottom": '1px solid #333',
        display: 'flex',
        "justify-content": 'space-between',
        "align-items": 'center'
      }}>
        <h1 style={{ margin: 0, "font-size": '1.2rem', "font-weight": 600 }}>
          Solid Resizable Panels
        </h1>
        <div style={{ "font-size": '0.8rem', color: '#888' }}>
          Interactive Demo
        </div>
      </header>

      <main style={{ flex: 1, overflow: 'hidden', padding: '1rem' }}>
        <div style={{ 
          width: '100%', 
          height: '100%', 
          border: '1px solid #333', 
          "border-radius": '8px',
          overflow: 'hidden',
          background: '#141414'
        }}>
          <PanelGroup direction="horizontal">
            <Panel defaultSize={20} minSize={10}>
              <div style={{ padding: '1rem', height: '100%', background: '#1a1a1a' }}>
                <h3 style={{ "margin-top": 0 }}>Sidebar</h3>
                <p style={{ color: '#888', "font-size": '0.9rem' }}>
                  This is the left panel. It has a minimum size of 10%.
                </p>
              </div>
            </Panel>
            
            <PanelResizeHandle />
            
            <Panel defaultSize={60}>
              <PanelGroup direction="vertical">
                <Panel defaultSize={70}>
                  <div style={{ 
                    padding: '1rem', 
                    height: '100%', 
                    display: 'flex', 
                    "flex-direction": 'column',
                    "justify-content": 'center',
                    "align-items": 'center',
                    background: '#1e1e1e'
                  }}>
                    <h2 style={{ color: '#007acc' }}>Main Content Area</h2>
                    <p>Try dragging the handles to resize the panels.</p>
                  </div>
                </Panel>
                
                <PanelResizeHandle />
                
                <Panel defaultSize={30}>
                  <div style={{ padding: '1rem', height: '100%', background: '#1a1a1a' }}>
                    <h4 style={{ "margin-top": 0 }}>Console / Terminal</h4>
                    <div style={{ 
                      "font-family": 'monospace', 
                      "font-size": '0.8rem', 
                      color: '#4ec9b0' 
                    }}>
                      $ npm install resizable-panels-solid<br/>
                      $ ready in 245ms
                    </div>
                  </div>
                </Panel>
              </PanelGroup>
            </Panel>
            
            <PanelResizeHandle />
            
            <Panel defaultSize={20} minSize={10}>
              <div style={{ padding: '1rem', height: '100%', background: '#1a1a1a' }}>
                <h3 style={{ "margin-top": 0 }}>Properties</h3>
                <div style={{ display: 'flex', "flex-direction": 'column', gap: '0.5rem' }}>
                  <div style={{ background: '#333', padding: '0.5rem', "border-radius": '4px' }}>
                    Item A
                  </div>
                  <div style={{ background: '#333', padding: '0.5rem', "border-radius": '4px' }}>
                    Item B
                  </div>
                </div>
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </main>

      <footer style={{ 
        padding: '0.5rem 2rem', 
        background: '#1a1a1a', 
        "border-top": '1px solid #333',
        "font-size": '0.75rem',
        color: '#666'
      }}>
        Built with SolidJS
      </footer>
    </div>
  )
}

export default App
