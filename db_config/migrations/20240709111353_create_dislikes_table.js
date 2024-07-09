// 20240709043624_create_recipes_table.js
export const up = function (knex) {
  return knex.schema.createTable("dislikes", function (table) {
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
  return knex.schema.dropTable("dislikes");
};
