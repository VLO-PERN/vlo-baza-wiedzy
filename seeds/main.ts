import * as Knex from "knex";
import argon2 from 'argon2';
import * as dotenv from "dotenv";
import fs from 'fs';
dotenv.config({ path: __dirname + "../" });

const loadBackup = async () => {
    try {
        const backup = fs.readFileSync(`${__dirname}/backup.json`);
        return JSON.parse(backup.toString());
    } catch {
        return null;
    }
}

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();
    await knex("users").insert([
        { id_user: 1, username: "admin", password: await argon2.hash(process.env.ADMIN_PASSWORD || "password1") }
    ]);
    const backup = await loadBackup();
    if (backup) {
        await knex("articles").del();
        await knex("courses").del();
        await knex("categories").del();
        await Promise.all(backup.map(async (category: any) => {
            await knex("categories").insert({
                "category_name": category.category["category_name"],
                "picture_url": category.category["picture_url"]
            });
            const coursesToInsert = (category.courses.map((course: any) => async () => {
                await knex("courses").insert({
                    name: course.name,
                    "id_category": (await knex('categories').select('*').orderBy('id_category', 'desc').limit(1))[0]["id_category"]
                });
                await Promise.all(course.articles.map(async (article: any) => {
                    await knex("articles").insert({
                        "id_course": (await knex('courses').select('*').orderBy('id_course', 'desc').limit(1))[0]["id_course"],
                        name: article.name,
                        contents: article.contents
                    });
                }));
            }));
            await coursesToInsert.reduce(async (previousPromise: any, nextAsyncFunction: any) => {
                await previousPromise;
                const result = await nextAsyncFunction();
                console.log(result);
              }, Promise.resolve());
        }))
    }
}