
export const up = function(knex) {
    return knex.schema.createTable("refreshToken", (table) => {
        table.increments("id").primary();
        table
          .integer("user_id")
          .unsigned()
          .references("id")  
          .inTable("users")
          .onDelete("CASCADE");
        table
          .string("token")
          .notNullable();
        table
          .timestamp("expires_at")
          .notNullable();
        table
          .timestamp("created_at")  
          .defaultTo(knex.fn.now());
        table
          .boolean("revoked")
          .defaultTo(false);
      });
      
};


export const down = function(knex) {
    return knex.schema.dropTable("refreshToken");
};
