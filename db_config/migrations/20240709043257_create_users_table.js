// migrations/<timestamp>_create_users_table.js
exports.up = function (knex) {
  return knex.schema.createTable("Users", function (table) {
    table.string("ID").primary();
    table.string("FirstName");
    table.string("LastName");
    table.string("Password");
    table.string("Email").unique();
    table.string("Username").unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Users");
};
