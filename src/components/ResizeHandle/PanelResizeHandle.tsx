import { JSX } from "solid-js";
import { usePanelGroup } from "../PanelGroup/PanelGroup";

export interface ResizeHandleProps {
  class?: string;
  style?: JSX.CSSProperties;
  id?: string;
}

export function PanelResizeHandle(props: ResizeHandleProps) {
  const group = usePanelGroup();
  let handleRef: HTMLDivElement | undefined;

  const onPointerDown = (e: PointerEvent) => {
    // Find index of this handle in the parent's children
    if (!handleRef || !handleRef.parentElement) return;
    
    const children = Array.from(handleRef.parentElement.children);
    // Filters only panel items to find the correct logical index
    const panelItems = children.filter(child => child.classList.contains("panel-item"));
    const handleIndex = children.indexOf(handleRef);
    
    // The handle at index 'h' is between panel at index 'i' and 'i+1'
    // We need to find how many panels are BEFORE this handle
    const precedingPanels = children.slice(0, handleIndex).filter(child => child.classList.contains("panel-item")).length;
    
    if (precedingPanels > 0 && precedingPanels < panelItems.length) {
      group.onResizeStart(precedingPanels - 1, e);
    }
  };

  return (
    <div
      ref={handleRef}
      id={props.id}
      class={`resize-handle ${group.direction} ${props.class || ""}`}
      onPointerDown={onPointerDown}
      style={{
        cursor: group.direction === "vertical" ? "row-resize" : "col-resize",
        "flex-basis": group.direction === "vertical" ? "4px" : "4px",
        "flex-shrink": 0,
        "flex-grow": 0,
        "z-index": 10,
        ...props.style
      }}
    />
  );
}
