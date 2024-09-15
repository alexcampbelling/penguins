import { AppDataSource } from "./data-source";
import { seedPenguins } from "./seed";

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
    console.log("Running seed...");
    await seedPenguins();
    console.log("Seed completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error during Data Source initialization or seeding:", error);
    process.exit(1);
  });
