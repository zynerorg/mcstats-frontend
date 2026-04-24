export function withNoneOption<T extends { name: string }>(items: T[]) {
  return [{ id: -1, name: "None" } as unknown as T, ...items];
}

export function getDefaultNone<T extends { name: string }>(items: T[]) {
  return items.find((i) => i.name === "None") ?? null;
}
