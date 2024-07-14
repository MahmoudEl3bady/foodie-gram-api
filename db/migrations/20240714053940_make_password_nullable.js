
export const up=(knex)=> {
    return knex.schema.alterTable('users', function(table) {
        table.string('password').nullable().alter();
      });
};


export const down = (knex) =>{
    return knex.schema.alterTable('users', function(table) {
        table.string('password').notNullable().alter(); 
    });
};
