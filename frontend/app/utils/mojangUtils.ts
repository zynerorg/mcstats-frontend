type LookupEntry = {
  uuid: string;
  name: string;
};

const uuidToNameCache = new Map<string, string>();
const nameToUuidCache = new Map<string, string>();

export async function nameToUuid(name: string): Promise<string | null> {
  const cached = nameToUuidCache.get(name);
  if (cached) return cached;

  const res = await fetch(
    `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(name)}`,
  );

  if (!res.ok) return null;

  const data = (await res.json()) as LookupEntry;

  const uuid = data.uuid;
  if (!uuid) return null;

  nameToUuidCache.set(name, uuid);
  uuidToNameCache.set(uuid, name);

  return uuid;
}

export async function uuidToName(uuid: string): Promise<string | null> {
  const cached = uuidToNameCache.get(uuid);
  if (cached) return cached;

  const res = await fetch(
    `https://api.minecraftservices.com/minecraft/profile/lookup/${uuid}`,
  );

  if (!res.ok) return null;

  const data = (await res.json()) as LookupEntry;

  const name = data.name;
  if (!name) return null;

  uuidToNameCache.set(uuid, name);
  nameToUuidCache.set(name, uuid);

  return name;
}
