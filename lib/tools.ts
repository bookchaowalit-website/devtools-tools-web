// The utility drawer: tool cards kept in this browser (localStorage), plus pure helpers for the page.

export type Tool = { id: string; title: string; body: string; status: string; createdAt: number };
export type Draft = Pick<Tool, "title" | "body" | "status">;

export const STORE_KEY = "tools-dir-v2";

// Fixed timestamps so the seed is the same on every load (it used Date.now() at import time).
export const SEED: Tool[] = [
  { id: "1", title: "JSON Formatter", body: "Pretty / minify", status: "Live", createdAt: Date.UTC(2026, 0, 1) },
  { id: "2", title: "Color Picker", body: "Sample a screen color", status: "Live", createdAt: Date.UTC(2026, 0, 2) },
];

export function parseTools(raw: string | null): Tool[] | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return null;
    return data.filter(
      (row): row is Tool => !!row && typeof row === "object" && typeof row.id === "string" && typeof row.title === "string",
    );
  } catch {
    return null;
  }
}

export function filterTools(items: Tool[], query: string): Tool[] {
  const needle = query.toLowerCase();
  return items.filter((item) => `${item.title} ${item.body} ${item.status}`.toLowerCase().includes(needle));
}

export function addTool(items: Tool[], draft: Draft, id: string, now: number): Tool[] {
  const title = draft.title.trim();
  if (!title) return items;
  return [{ id, ...draft, title, createdAt: now }, ...items];
}
