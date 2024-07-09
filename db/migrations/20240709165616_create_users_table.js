export const up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("password").notNullable();
    table.string("email").notNullable().unique();
    table.string("username").notNullable().unique();
  });
};

export const down = (knex) => {
  return knex.schema.dropTable("users");
};
