const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS

const app = express();
const PORT = 5001;

// Enable CORS for all routes
app.use(cors());

mongoose.connect("mongodb://localhost:27017/treeDb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));


const categorySchema = new mongoose.Schema({
  name: String,
  children: [
    {
      _id: String,
      name: String,
      children: Array,
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

app.get("/api/tree", async (req, res) => {
  try {
    const treeData = await Category.find();
    res.json(treeData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tree data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
