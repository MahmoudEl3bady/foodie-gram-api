// migrations/20240709050001_create_favorites_table.js
export const up = function (knex) {
  return knex.schema.createTable("favorites", function (table) {
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("recipe_id")
      .unsigned()
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("favorites");
};
