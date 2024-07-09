// migrations/<timestamp>_create_recipes_table.js
export const up = function(knex) {
    return knex.raw(`
      CREATE TABLE Recipes (
  ID TEXT PRIMARY KEY, 
  Title TEXT,
  Ingredients TEXT,
  Instructions TEXT,
  Image TEXT,
  UserId TEXT, 
  PostedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (UserId) REFERENCES Users(ID)
);
    `);
  };
  
  export const down = function(knex) {
    return knex.raw('DROP TABLE Recipes;');
  };
  