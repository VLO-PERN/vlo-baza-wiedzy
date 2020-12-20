import * as Knex from "knex";
import argon2 from 'argon2';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "../" });

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();
    await knex("users").insert([
        { id_user: 1, username: "admin", password: await argon2.hash(process.env.ADMIN_PASSWORD || "password1") }
    ]);
}