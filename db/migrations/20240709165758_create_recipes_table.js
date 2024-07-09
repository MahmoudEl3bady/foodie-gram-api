export const up = (knex) => {
  return knex.schema.createTable("recipes", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("ingredients").notNullable();
    table.text("instructions").notNullable();
    table.string("image");
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.timestamp("posted_at").defaultTo(knex.fn.now());
  });
};

export const down = (knex) => {
  return knex.schema.dropTable("recipes");
};
