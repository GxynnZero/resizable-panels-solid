<p align="center">
  <img width="100%" src="https://assets.solidjs.com/banner?type=resizable-panels-solid&background=tiles&project=" alt="resizable-panels-solid" />
</p>

<br/>

# 🧩 resizable-panels-solid

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![SolidJS](https://img.shields.io/badge/built%20for-SolidJS-2c4f7c?style=for-the-badge)](https://www.solidjs.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)]()

> A lightweight, flexible, and deeply composable resizable panel system for SolidJS — built for modern IDE-style layouts, dashboards, and complex UI systems.

---

## ✨ Why this exists

Most UI layout systems fail when you try to build:

- VS Code-style editors
- Figma-like dashboards
- Nested split layouts
- Dockable panel systems

They either:
- break under nesting
- lack fine-grained control
- depend heavily on CSS hacks
- or are not reactive enough

👉 `resizable-panels-solid` solves this by treating layout as a **reactive tree system**, not just flexbox.

---

## 🚀 Features

### 🧠 Layout System
- Nested `PanelGroup` support (infinite depth)
- Horizontal & vertical split directions
- Tree-based layout model (not flat arrays)

### 🖱️ Interaction
- Smooth pointer-based resizing
- Independent panel resizing
- Drag handles with hover/active states
- No accidental text selection during drag

### 📐 Constraints
- min/max panel sizes
- locked panels support
- proportional resizing logic

### ⚡ Performance
- SolidJS fine-grained reactivity
- No full-tree rerenders
- Minimal DOM updates
- requestAnimationFrame smoothing

### 💾 Persistence (optional)
- Save layout state to localStorage
- Restore layouts automatically
- JSON serializable structure

---

## 📦 Installation

```bash
npm install resizable-panels-solid
````

or

```bash
pnpm add resizable-panels-solid
```

or

```bash
yarn add resizable-panels-solid
```

---

## 🧪 Basic Usage

### Horizontal Split

```tsx
import { PanelGroup, Panel, ResizeHandle } from "resizable-panels-solid";

export default function App() {
  return (
    <PanelGroup direction="horizontal">
      
      <Panel>
        Left Panel
      </Panel>

      <ResizeHandle />

      <Panel>
        Right Panel
      </Panel>

    </PanelGroup>
  );
}
```

---

### Vertical Split

```tsx
<PanelGroup direction="vertical">

  <Panel>
    Top Panel
  </Panel>

  <ResizeHandle />

  <Panel>
    Bottom Panel
  </Panel>

</PanelGroup>
```

---

## 🧱 Nested Layouts (Power Feature 🔥)

```tsx
<PanelGroup direction="horizontal">

  <Panel>
    Sidebar
  </Panel>

  <ResizeHandle />

  <Panel>
    
    <PanelGroup direction="vertical">

      <Panel>Main Editor</Panel>

      <ResizeHandle />

      <Panel>Console</Panel>

    </PanelGroup>

  </Panel>

</PanelGroup>
```

---

## ⚙️ API Reference

### `<PanelGroup />`

| Prop         | Type          | Description         |                  |
| ------------ | ------------- | ------------------- | ---------------- |
| direction    | "horizontal" | "vertical"         | Layout direction |
| defaultSizes | `number[]`    | Initial panel sizes |                  |
| children     | `JSX`         | Panels + handles    |                  |

---

### `<Panel />`

| Prop    | Type     | Description               |
| ------- | -------- | ------------------------- |
| id      | `string` | Optional panel identifier |
| minSize | `number` | Minimum size constraint   |
| maxSize | `number` | Maximum size constraint   |

---

### `<ResizeHandle />`

| Prop        | Type     | Description         |
| ----------- | -------- | ------------------- |
| class       | `string` | Custom styles       |
| onDragStart | `fn`     | Hook for drag start |
| onDragEnd   | `fn`     | Hook for drag end   |

---

## 🧠 Design Philosophy

This library follows three principles:

### 1. Layout is a tree

Every split is a node — not a flat flex row.

### 2. UI is a projection

Panels render state, they don’t *own* layout logic.

### 3. Interaction is isolated

Dragging logic is separate from rendering.

---

## ⚡ Advanced Features (Roadmap)

* [ ] Floating detachable panels
* [ ] Tab groups inside panels
* [ ] Snap-to-grid resizing
* [ ] Keyboard resizing support
* [ ] Layout animation system
* [ ] Docking zones (VS Code style)
* [ ] Layout history (undo/redo)
* [ ] Multi-window layout sync

---

## 🧪 Example Use Cases

* Code editors (VS Code clone UI)
* Design tools (Figma-style layout systems)
* Dashboard builders
* Circuit simulators (👀 your use case)
* Data visualization tools
* Web IDEs

---

## 🏗️ Architecture

```
PanelGroup (layout container)
 ├── Panel
 ├── ResizeHandle
 ├── Panel
      ├── PanelGroup (nested)
      │    ├── Panel
      │    ├── ResizeHandle
      │    └── Panel
```

---

## 🧩 Built With

* SolidJS reactivity system
* Pointer Events API
* requestAnimationFrame
* Minimal DOM mutation strategy

---

## 📦 Created With

Generated using the **SolidJS CLI**

[https://github.com/solidjs-community/solid-cli](https://github.com/solidjs-community/solid-cli)

---

## 📜 License

<<<<<<< HEAD
MIT — build cool things 🚀
=======
MIT — build cool things 🚀

```

---

# 💡 If you want next upgrade
I can also help you make:

- 🔥 GitHub repo landing page (beautiful UI)
- 🎨 animated demo GIF / video script
- 🧠 architecture diagram (like Radix UI docs)
- 🚀 npm package SEO optimization
- ⚡ real “shadcn-style” docs site (VitePress / Astro)

Just say 👍
```
>>>>>>> 7b8453507699c1cb47d9b36217b27b3c0279827f
