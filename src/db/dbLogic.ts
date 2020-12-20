import Knex from 'knex';
import knexConfig from '../../knexfile';
import article from '../interfaces/article';
import category from '../interfaces/category';
import course from '../interfaces/course';
import user from '../interfaces/user';

class Database {
    private knex: Knex;
    constructor() {
        this.knex = Knex(knexConfig.development);
    }

    public async getUserByUsername(username: string): Promise<user | null> {
        try {
            const result = await this.knex('users').where({ "username": username })
            .select('*');
            if (result.length === 1) {
                return result[0];
            } else {
                return null;
            }
        } catch {
            throw Error("Failed getting user!");
        }
    }

    public async addCategory(catName: string, catPicUrl: string): Promise<void> {
        try {
            await this.knex('categories').insert({
                "category_name": catName,
                "picture_url": catPicUrl
            });
        } catch {
            throw Error("Failed adding a new category!");
        }
    }
    public async updateCategory(catId: number, catName: string, catPicUrl: string): Promise<void> {
        try {
            await this.knex('categories').where({ "id_category": catId })
            .update({
                "category_name": catName,
                "picture_url": catPicUrl
            });
        } catch {
            throw Error("Failed updating category!");
        }
    }
    public async deleteCategory(catId: number): Promise<void> {
        try {
            await this.knex.transaction(async trx => {
                const articles = await trx('articles').innerJoin('courses', 'articles.id_course', 'courses.id_course').select('*').where('id_category', '=', catId);
                for (let i = 0; i < articles.length; i++) {
                    await trx('articles').where('id_article', '=', articles[i]['id_article']).del();
                }
                await trx('courses').where('id_category', '=', catId).del();
                await trx('categories').where("categories.id_category", '=', catId ).del();
            });
        } catch (err) {
            console.error(err);
            throw Error("Failed deleting category!");
        }
    }
    public async getCategoryById(catId: number): Promise<category> {
        try {
            const result = await this.knex('categories').where({ "id_category": catId })
            .select('*');
            if (result.length === 1) {
                return result[0];
            } else {
                throw Error("Couldn't find a category with a provided id!");
            }
        } catch {
            throw Error("Failed getting category by id!");
        }
    }
    public async getAllCategories(limit?: number): Promise<Array<category>> {
        try {
            return limit ? await this.knex('categories')
            .limit(limit).select('*') :
            await this.knex('categories')
            .select('*');
        } catch {
            throw Error("Failed getting categories!");
        }
    }

    public async addCourse(idCat: number, courseName: string): Promise<void> {
        try {
            await this.knex('courses').insert({
                "id_category": idCat,
                "name": courseName
            })
        } catch {
            throw Error("Failed adding a new course!");
        }
    }
    public async updateCourse(courseId: number, courseName: string): Promise<void> {
        try {
            await this.knex('courses').where({ "id_course": courseId })
            .update({
                "name": courseName
            });
        } catch {
            throw Error("Failed updating course!");
        }
    }
    public async deleteCourse(courseId: number): Promise<void> {
        try {
            await this.knex.transaction( async trx => {
                await trx('articles').where({ "id_course": courseId }).del();
                await trx('courses').where({ "id_course": courseId }).del();
            });
        } catch {
            throw Error("Failed deleting course!");
        }
    }

    public async getCourseById(courseId: number): Promise<course> {
        try {
            const result = await this.knex('courses').where({ "id_course": courseId })
            .select('*');
            if (result.length === 1) {
                return result[0];
            } else {
                throw Error("Couldn't find a course with a provided id!");
            }
        } catch {
            throw Error("Failed getting course by id!");
        }
    }

    public async getCoursesByCategoryId(categoryId: number): Promise<Array<course>> {
        try {
            return await this.knex('courses').where({ "id_category": categoryId }).select('*').orderBy('name');
        } catch {
            throw Error("Failed getting course by category id!");
        }
    }

    public async getAllCourses(categoryId: number, limit?: number): Promise<Array<course>> {
        try {
            return limit ? await this.knex('courses')
            .where({ "id_category": categoryId })
            .limit(limit).select('*').orderBy('name') :
            await this.knex('courses')
            .where({ "id_category": categoryId })
            .select('*').orderBy('name');
        } catch {
            throw Error("Failed getting courses!");
        }
    }

    public async addArticle(idCourse: number,
        articleName: string,
        articleContents: string): Promise<void> {
        try {
            await this.knex('articles').insert({
                "id_course": idCourse,
                "name": articleName,
                "contents": articleContents
            });
        } catch {
            throw Error("Failed adding article!");
        }
    }

    public async updateArticle(articleId: number,
        articleName: string,
        articleContents: string): Promise<void> {
        try {
            await this.knex('articles').where({ "id_article": articleId })
            .update({
                "name": articleName,
                "contents": articleContents
            });
        } catch {
            throw Error("Failed updating article!");
        }
    }

    public async deleteArticle(articleId: number): Promise<void> {
        try {
            await this.knex('articles').where({ "id_article": articleId })
            .del();
        } catch {
            throw Error("Failed deleting article!");
        }
    }
    public async getArticleById(articleId: number): Promise<article> {
        try {
            const result = await this.knex('articles').where({ "id_article": articleId })
            .select('*');
            if (result.length === 1) {
                return result[0];
            } else {
                throw Error("Couldn't find an article with a provided id!");
            }
        } catch {
            throw Error("Failed getting article by id!");
        }
    }

    public async getArticlesByCourseId(courseId: number): Promise<Array<article>> {
        try {
            return await this.knex('articles').where({ "id_course": courseId }).select('*').orderBy('name');
        } catch {
            throw Error("Failed getting article by id!");
        }
    }

    public async getAllArticles(courseId: number, limit?: number): Promise<Array<article>> {
        try {
            return limit ? await this.knex('articles')
            .where({ "id_course": courseId })
            .limit(limit).select('*').orderBy('name') :
            await this.knex('courses')
            .where({ "id_course": courseId })
            .select('*').orderBy('name');
        } catch {
            throw Error("Failed getting articles!");
        }
    }
}

export default Database;