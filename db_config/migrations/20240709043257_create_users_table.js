// migrations/<timestamp>_create_recipes_table.js
export const up = function(knex) {
    return knex.raw(`
      CREATE TABLE Users (
    ID TEXT PRIMARY KEY, 
    FirstName TEXT,
    LastName TEXT,
    Password TEXT,
    Email TEXT UNIQUE, 
    Username TEXT UNIQUE
  );
    `);
  };
  
  export const down = function(knex) {
    return knex.raw('DROP TABLE Users;');
  };
  