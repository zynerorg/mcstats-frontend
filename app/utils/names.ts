const uuidToNameCache = new Map<string, Promise<string>>();
const nameToUuidCache = new Map<string, Promise<string>>();

async function fetchHelper(
  cache: Map<string, Promise<string>>,
  url: string,
  value: string,
  field: keyof { name: string; id: string } = "name",
): Promise<string> {
  if (cache.has(value)) {
    return cache.get(value)!;
  }

  const promise = (async () => {
    const response = await $fetch<{ name: string; id: string }>(url + value);
    return response[field];
  })();

  cache.set(value, promise);
  return promise;
}

export async function uuidToName(uuid: string): Promise<string> {
  return fetchHelper(uuidToNameCache, "/api/uuid-to-name?uuid=", uuid);
}

export function nameToUuid(name: string): Promise<string> {
  return fetchHelper(nameToUuidCache, "/api/name-to-uuid?name=", name, "id")
    .then(uuid => uuid.slice(0, 8) + "-" + uuid.slice(8, 12) + "-" + uuid.slice(12, 16) + "-" + uuid.slice(16, 20) + "-" + uuid.slice(20));
}
