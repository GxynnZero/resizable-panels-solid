import { Accessor, Setter } from "solid-js";

export type Direction = "horizontal" | "vertical";
export type ResizeMode = "sibling" | "independent";

export interface PanelConstraints {
  minSize?: number; // In percentage (0-100) or pixels? Let's stick to percentage for flex
  maxSize?: number;
  collapsible?: boolean;
  minPixels?: number;
}

export interface PanelState {
  id: string;
  size: number; // Current percentage
  isCollapsed: boolean;
}

export interface IPanelNode {
  id: string;
  size: Accessor<number>;
  setSize: Setter<number>;
  constraints: PanelConstraints;
  isCollapsed: Accessor<boolean>;
  setCollapsed: Setter<boolean>;
}

export interface IPanelGroupNode {
  direction: Direction;
  children: (IPanelNode | IPanelGroupNode)[];
}

export type LayoutTree = {
  version: number;
  root: PanelGroupState;
};

export type PanelGroupState = {
  type: "group";
  direction: Direction;
  children: (PanelState | PanelGroupState)[];
};
