import {
  createContext,
  useContext,
  JSX,
  createSignal
} from "solid-js";
import { Direction, IPanelNode, ResizeMode } from "../../types";
import { calculateResize } from "../../core/engine";

interface PanelGroupContextValue {
  direction: Direction;
  resizeMode: ResizeMode;
  registerPanel: (node: IPanelNode) => void;
  unregisterPanel: (id: string) => void;
  onResizeStart: (index: number, event: PointerEvent) => void;
}

const PanelGroupContext = createContext<PanelGroupContextValue>();

export function usePanelGroup() {
  const context = useContext(PanelGroupContext);
  if (!context) throw new Error("usePanelGroup must be used within a PanelGroup");
  return context;
}

export interface PanelGroupProps {
  children: JSX.Element;
  direction?: Direction;
  resizeMode?: ResizeMode;
  id?: string;
  class?: string;
  style?: JSX.CSSProperties;
}

export function PanelGroup(props: PanelGroupProps) {
  const [panels, setPanels] = createSignal<IPanelNode[]>([]);
  let containerRef: HTMLDivElement | undefined;

  const registerPanel = (node: IPanelNode) => {
    setPanels(p => {
      const newPanels = [...p, node];
      // On first few registrations, if sizes are 0, we should distribute them
      const totalProvided = newPanels.reduce((acc, n) => acc + (n.size() || 0), 0);
      const unassigned = newPanels.filter(n => n.size() === 0);

      if (unassigned.length > 0 && totalProvided < 100) {
        const remaining = 100 - totalProvided;
        const each = remaining / unassigned.length;
        unassigned.forEach(n => n.setSize(each));
      }

      return newPanels;
    });
  };

  const unregisterPanel = (id: string) => {
    setPanels(p => p.filter(n => n.id !== id));
  };

  let activeResizeIndex: number | null = null;
  let startX = 0;
  let startY = 0;

  const onPointerMove = (e: PointerEvent) => {
    if (activeResizeIndex === null || !containerRef) return;

    requestAnimationFrame(() => {
      const rect = containerRef!.getBoundingClientRect();
      const delta = props.direction === "vertical"
        ? e.clientY - startY
        : e.clientX - startX;

      const containerSize = props.direction === "vertical" ? rect.height : rect.width;

      calculateResize(
        {
          containerSize,
          direction: props.direction || "horizontal",
          nodes: panels(),
          mode: props.resizeMode || "sibling"
        },
        activeResizeIndex!,
        delta
      );

      startX = e.clientX;
      startY = e.clientY;
    });
  };

  const onPointerUp = () => {
    activeResizeIndex = null;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  const onResizeStart = (index: number, e: PointerEvent) => {
    activeResizeIndex = index;
    startX = e.clientX;
    startY = e.clientY;
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    document.body.style.cursor = props.direction === "vertical" ? "row-resize" : "col-resize";
    document.body.style.userSelect = "none";
  };

  return (
    <PanelGroupContext.Provider value={{
      direction: props.direction || "horizontal",
      resizeMode: props.resizeMode || "sibling",
      registerPanel,
      unregisterPanel,
      onResizeStart
    }}>
      <div
        ref={containerRef}
        id={props.id}
        class={`panel-group ${props.direction || "horizontal"} ${props.class || ""}`}
        style={{
          display: "flex",
          "flex-direction": props.direction === "vertical" ? "column" : "row",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          ...props.style
        }}
      >
        {props.children}
      </div>
    </PanelGroupContext.Provider>
  );
}
