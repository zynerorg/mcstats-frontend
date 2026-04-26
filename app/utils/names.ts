const uuidToNameCache = new Map<string, Promise<string>>();
const nameToUuidCache = new Map<string, Promise<string>>();

async function fetchHelper(
  cache: Map<string, Promise<string>>,
  url: string,
  value: string,
): Promise<string> {
  if (cache.has(value)) {
    return cache.get(value)!;
  }

  const promise = (async () => {
    const response = await $fetch<{ name: string }>(url + value);
    return response.name;
  })();

  cache.set(value, promise);
  return promise;
}

export async function uuidToName(uuid: string): Promise<string> {
  return fetchHelper(uuidToNameCache, "/api/uuid-to-name?uuid=", uuid);
}

export function nameToUuid(name: string): Promise<string> {
  return fetchHelper(nameToUuidCache, "/api/name-to-uuid?name=", name);
}
