module.exports = {
  client: {
    service: {
      name: "my-api",
      url: "http://localhost:2456/graphql",
    },
    includes: ["**/*.vue", "**/*.ts", "**/*.js", "**/*.graphql"],
  },
};
