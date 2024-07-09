exports.up = function (knex) {
  return knex.schema.createTable("recipes", function (table) {
    table.increments("id").primary();
    table.string("title");
    table.text("image");
    table.text("ingredients");
    table.text("instructions");
    table.integer("user_id").references("id").inTable("users");
    table.timestamp("posted_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("recipes");
};
