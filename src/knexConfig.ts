import * as dotenv from "dotenv";
import path from 'path';
dotenv.config({ path: path.join(__dirname, "../") });

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

export default config;