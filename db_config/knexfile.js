// knexFile.js
export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./foodie-gram.sqlite3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
