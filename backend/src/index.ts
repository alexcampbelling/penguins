import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import { seedPenguins } from "./seed";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", routes);

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    // Run the seed function
    await seedPenguins();

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
