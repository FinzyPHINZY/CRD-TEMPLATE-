require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const Item = require("./models/Item");
const PORT = process.env.PORT || 3500;
const connectDB = require("./config/database");

const app = express();

// Connect to MongoDB with mongoose
connectDB();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// In many cases, setting extended to true is a safe and flexible choice, especially if you're unsure about the structure of incoming form data. However, if you're dealing with high-performance applications where every bit of efficiency matters, and you're certain that your form data will always be simple, setting extended to false might be slightly advantageous. Ultimately, consider your application's specific needs and make the choice that best fits those requirements.

app.use(express.urlencoded({ extended: true }));

// Set View Engine
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/item", async (req, res) => {
  const items = await Item.find({}).sort({ name: 1 });
  res.render("items.ejs", { items });
});

// Create
app.post("/item", async (req, res) => {
  const newItem = new Item(req.body);
  try {
    await newItem.save();
    res.redirect("/item");
  } catch (err) {
    console.error(err);
    res.redirect("/item?error=true");
  }
});

// Update
app.post("/item/update/:id", async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    await Item.findByIdAndUpdate(id, { name, description });
    res.redirect("/item");
  } catch (err) {
    res.redirect("item?error=true");
  }
});

// Delete
app.delete("/item/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await Item.findByIdAndDelete(id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.redirect("item?error=true");
  }
});

// app.delete("/item/delete/:id", async (req, res) => {
//   const { id } = req.params;
//   await Item.findByIdAndDelete(id);
//   //Send success back to the client-side function
//   res.status(200).json({ message: "Item deleted successfully" });
// });

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server is running on https://crud-template.onrender.com/ ...Betta go catch it! ${PORT}`
  );
});
