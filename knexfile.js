import path from "path";

export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve("db/foodie-gram.sqlite3"),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve("db/migrations"),
    },
    seeds: {
      directory: path.resolve("db/seeds"),
    },
  },
};
