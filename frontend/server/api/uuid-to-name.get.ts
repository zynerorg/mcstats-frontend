export default defineCachedEventHandler((event) => {
  const query = getQuery(event);
  const request = $fetch(
    "https://sessionserver.mojang.com/session/minecraft/profile/" + query.uuid,
  );
  return request;
});
