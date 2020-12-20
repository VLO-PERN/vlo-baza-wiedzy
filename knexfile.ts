import * as dotenv from "dotenv";
dotenv.config();

const config = {

  development: {
    client: "pg",
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "db"
    }
  }

};
module.exports = config;
export default config;