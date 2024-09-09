const express = require("express");
const Pokemon = require("../models/Pokemon");
const auth = require("../middleware/auth");
const router = express.Router();

// Get all Pokémon (public route) with pagination
router.get("/", async (req, res) => {
  try {
    // 1. Get page and limit from query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // 2. Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // 3. Fetch Pokémon with pagination
    const pokemon = await Pokemon.find().skip(skip).limit(limit);

    // 4. Get total count of Pokémon
    const total = await Pokemon.countDocuments();

    // 5. Calculate total pages
    const totalPages = Math.ceil(total / limit);

    // 6. Send paginated response
    res.json({
      pokemon,
      currentPage: page,
      totalPages,
      totalPokemon: total,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Pokémon", error: error.message });
  }
});

// Get a specific Pokémon (authenticated users only)
router.get("/:id", auth, async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id: req.params.id });
    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon not found" });
    }
    res.json(pokemon);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Pokémon", error: error.message });
  }
});

// Add a new Pokémon (admin only)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  try {
    const pokemon = new Pokemon(req.body);
    await pokemon.save();
    res.status(201).json(pokemon);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding Pokémon", error: error.message });
  }
});

// Update a Pokémon (admin only)
router.put("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  try {
    const pokemon = await Pokemon.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon not found" });
    }
    res.json(pokemon);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating Pokémon", error: error.message });
  }
});

// Delete a Pokémon (admin only)
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  try {
    const pokemon = await Pokemon.findOneAndDelete({ id: req.params.id });
    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon not found" });
    }
    res.json({ message: "Pokémon deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Pokémon", error: error.message });
  }
});

// New route: Get a Pokémon by name (authenticated users only)
router.get("/name/:name", auth, async (req, res) => {
  try {
    const pokemonName = req.params.name.toLowerCase();
    const pokemon = await Pokemon.findOne({
      "name.english": { $regex: new RegExp(`^${pokemonName}$`, "i") },
    });

    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon not found" });
    }
    res.json(pokemon);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Pokémon", error: error.message });
  }
});

module.exports = router;
