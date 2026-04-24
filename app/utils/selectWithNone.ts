export function withNoneOption<T extends { name: string }>(
  items: T[],
  noneLabel: string,
) {
  return [{ id: -1, name: noneLabel } as unknown as T, ...items];
}

export function getDefaultNone<T extends { name: string }>(
  items: T[],
  noneLabel: string,
) {
  return items.find((i) => i.name === noneLabel) ?? null;
}
