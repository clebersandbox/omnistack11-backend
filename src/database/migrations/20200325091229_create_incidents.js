
exports.up = function(knex) {
    return knex.schema.createTable('incidents', (table) => {
        table.increments('oid_indidents');

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
  
        table.string('oid_ongs').notNullable();
  
        table.foreign('oid_ongs').references('oid_ongs').inTable('ongs');
    });  
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
