const uuidNameCache = new Map<string, Promise<string>>();

export async function uuidToName(
  uuid: string,
  fallback?: string,
): Promise<string> {
  const resolvedFallback = fallback ?? uuid;

  if (uuidNameCache.has(uuid)) {
    return uuidNameCache.get(uuid)!;
  }

  const promise = (async () => {
    try {
      const response = await $fetch<{ name: string }>(
        `/api/uuid-to-name?uuid=${uuid}`,
      );
      return response.name ?? resolvedFallback;
    } catch {
      return resolvedFallback;
    }
  })();

  uuidNameCache.set(uuid, promise);
  return promise;
}

export function createUuidTransformer(addToField: string) {
  return async (item: any) => {
    const playerUuid = item.playerUuid as string;
    const name = await uuidToName(playerUuid);
    return {
      ...item,
      [addToField]: name,
    };
  };
}
