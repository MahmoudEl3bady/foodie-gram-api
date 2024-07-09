// migrations/20240709050000_create_comments_table.js
export const up = function (knex) {
  return knex.schema.createTable("comments", function (table) {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");      
    table
      .integer("recipe_id")
      .unsigned()
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");      
    table.text("comment").notNullable();
    table.timestamp("posted_at").defaultTo(knex.fn.now());
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("comments");
};
