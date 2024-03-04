const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please, provide a valid name"],
  },
  description: {
    type: String,
    required: [true, "Please, provide a valid description"],
  },
});

module.exports = mongoose.model("Item", ItemSchema);
