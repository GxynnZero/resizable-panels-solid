import { PanelGroupState, PanelState } from "../types";

export function serializeLayout(container: HTMLElement): PanelGroupState | null {
  // This is a bit tricky since the state is in the components
  // But we can walk the DOM to find panels and handles if we store data-attributes
  // Or better, keep a registry.
  return null; // Placeholder for now
}

export function saveToLocalStorage(key: string, state: PanelGroupState) {
  localStorage.setItem(key, JSON.stringify({
    version: 1,
    state
  }));
}

export function loadFromLocalStorage(key: string): PanelGroupState | null {
  const data = localStorage.getItem(key);
  if (!data) return null;
  try {
    const parsed = JSON.parse(data);
    return parsed.state;
  } catch (e) {
    return null;
  }
}
