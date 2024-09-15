import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Penguin } from "../entity/Penguin";

const router = Router();

// Create or fetch user
router.post("/users", async (req, res) => {
  const { username } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  try {
    let user = await userRepository.findOne({
      where: { username },
      relations: ["penguins"],
    });

    if (!user) {
      user = userRepository.create({ username });
      await userRepository.save(user);
    }

    res.json({
      username: user.username,
      penguinsCollected: user.penguins.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating/fetching user", error });
  }
});

// Add a penguin to a user's collection
router.post("/collect", async (req, res) => {
  const { username, penguinId } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const penguinRepository = AppDataSource.getRepository(Penguin);

  try {
    let user = await userRepository.findOne({
      where: { username },
      relations: ["penguins"],
    });

    if (!user) {
      user = userRepository.create({ username, penguins: [] });
    }

    const penguin = await penguinRepository.findOne({
      where: { id: penguinId },
    });

    if (!penguin) {
      return res.status(404).json({ message: "Penguin not found" });
    }

    // Check if user already has this penguin
    if (!user.penguins.some((p) => p.id === penguinId)) {
      user.penguins.push(penguin);
      await userRepository.save(user);
    }

    res.json({
      username: user.username,
      penguinsCollected: user.penguins.length,
      newPenguin: penguin.name,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Error collecting penguin:", error);
    res.status(500).json({ message: "Error collecting penguin", error });
  }
});

// Fetch user data including collected penguins
router.get("/users/:username", async (req, res) => {
  const { username } = req.params;
  const userRepository = AppDataSource.getRepository(User);

  try {
    const user = await userRepository.findOne({
      where: { username },
      relations: ["penguins"],
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

export default router;
