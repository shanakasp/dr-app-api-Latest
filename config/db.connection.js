import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres", // Set the dialect to "postgres" for PostgreSQL
    host: process.env.DB_HOST,
  }
);

export default sequelize;
