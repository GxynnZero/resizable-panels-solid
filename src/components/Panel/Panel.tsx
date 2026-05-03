import {
  JSX,
  onMount,
  onCleanup,
  createUniqueId,
} from "solid-js";
import { usePanelGroup } from "../PanelGroup/PanelGroup";
import { PanelNode } from "../../core/engine";
import { PanelConstraints } from "../../types";

export interface PanelProps {
  children: JSX.Element;
  id?: string;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  class?: string;
  style?: JSX.CSSProperties;
}

export function Panel(props: PanelProps) {
  const group = usePanelGroup();
  const id = props.id || createUniqueId();

  const node = new PanelNode(id, props.defaultSize ?? 0, {
    minSize: props.minSize,
    maxSize: props.maxSize,
    collapsible: props.collapsible
  });

  onMount(() => {
    group.registerPanel(node);
  });

  onCleanup(() => {
    group.unregisterPanel(id);
  });

  return (
    <div
      id={`panel-${id}`}
      class={`panel-item ${props.class || ""}`}
      style={{
        "flex-basis": `${node.size()}%`,
        "flex-grow": 0,
        "flex-shrink": 0,
        overflow: "hidden",
        position: "relative",
        ...props.style
      }}
    >
      {props.children}
    </div>
  );
}
