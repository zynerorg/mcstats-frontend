export function withNoneOption<T>(
  items: T[],
  noneLabel: string,
) {
  const noneItem = { id: -1, name: noneLabel, label: noneLabel, value: noneLabel } as unknown as T;
  return [noneItem, ...items];
}

export function getDefaultNone<T extends { name?: string; label?: string }>(
  items: T[],
  noneLabel: string,
) {
  return items.find((i) => i.name === noneLabel || i.label === noneLabel) ?? null;
}