import { AppDataSource } from "./data-source";
import { Penguin } from "./entity/Penguin";

const penguinData = [
  {
    id: "TM7l7t",
    name: "Men in Black Penguin",
    suburb: "Kensington",
    imageUrl: "/images/penguin_mib.jpg",
    rarity: "common",
    dateAdded: new Date(),
  },
  {
    id: "Wkoykt",
    name: "Gangster Penguin",
    suburb: "Flemington",
    imageUrl: "/images/penguin_gangster.jpg",
    rarity: "common",
    dateAdded: new Date(),
  },
  {
    id: "Lp9m2x",
    name: "Surfer Penguin",
    suburb: undefined,
    street: "Beach Rd",
    imageUrl: "/images/penguin_surfer.png",
    rarity: "rare",
    dateAdded: new Date(),
  },
];

export async function seedPenguins() {
  const penguinRepository = AppDataSource.getRepository(Penguin);

  for (const data of penguinData) {
    let penguin = await penguinRepository.findOne({
      where: { id: data.id },
    });
    if (penguin) {
      // Update existing penguin
      penguinRepository.merge(penguin, data);
    } else {
      // Create new penguin
      penguin = penguinRepository.create(data);
    }
    await penguinRepository.save(penguin);
    console.log(
      `Seeded/Updated penguin: ${penguin.name} with ID: ${penguin.id} on ${penguin.dateAdded}`
    );
  }
}
