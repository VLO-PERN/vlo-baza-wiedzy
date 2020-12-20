import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', table => {
        table.bigIncrements('id_user').primary();
        table.string('username', 100).unique().notNullable();
        table.string('password', 100).notNullable();
    })
    await knex.schema.createTable('categories', table => {
        table.bigIncrements('id_category').primary();
        table.string('category_name', 100).unique().notNullable();
        table.string('picture_url', 255).notNullable();
    })
    await knex.schema.createTable('courses', table => {
        table.bigIncrements('id_course').primary();
        table.bigInteger('id_category').notNullable();
        table.foreign('id_category').references('id_category').inTable('categories');
        table.string('name', 100).notNullable();
    })
    await knex.schema.createTable('articles', table => {
        table.bigIncrements('id_article').primary();
        table.bigInteger('id_course').notNullable();
        table.foreign('id_course').references('id_course').inTable('courses');
        table.string('name', 100).notNullable();
        table.text('contents').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
    await knex.schema.dropTable('categories');
    await knex.schema.dropTable('courses');
    await knex.schema.dropTable('articles');
}