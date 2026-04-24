type AnyFilter = {
  id: number;
  name: string;
  playerUuid?: string;
};

function isNone(v: { id: number }) {
  return v.id === -1;
}

export function normalizeStatsFilters(filters: Record<string, any>) {
  const category = filters.category as AnyFilter | undefined;
  const item = filters.item as AnyFilter | undefined;
  const player = filters.player as AnyFilter | undefined;

  return {
    category: category && !isNone(category) ? category.name : undefined,
    item: item && !isNone(item) ? item.name : undefined,
    player_uuid: player && !isNone(player) ? player.playerUuid : undefined,
  };
}
