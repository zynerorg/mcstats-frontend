export default defineCachedEventHandler((event) => {
  const query = getQuery(event);
  const request = $fetch(
    "https://api.mojang.com/users/profiles/minecraft/" + query.name,
  );
  return request;
});
