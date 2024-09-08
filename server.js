require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // Add this line

const authRoutes = require("./routes/auth");
const pokemonRoutes = require("./routes/pokemon");

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Serve static files from the 'images' directory
app.use("/images", express.static(path.join(__dirname, "images"))); // Add this line

app.use("/api/auth", authRoutes);
app.use("/api/pokemon", pokemonRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
