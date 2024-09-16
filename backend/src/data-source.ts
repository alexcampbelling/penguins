import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Penguin } from "./entity/Penguin";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  username: process.env.POSTGRES_USER || "penguin_user",
  password: process.env.POSTGRES_PASSWORD || "penguin_password",
  database: process.env.POSTGRES_DB || "penguin_db",
  synchronize: false,
  logging: false,
  entities: [User, Penguin],
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
});
