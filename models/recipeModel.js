const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  item: { type: String, required: false },
  quantity: { type: String, required: false },
  unit: { type: String },
  notes: { type: String },
});

const instructionSchema = new mongoose.Schema({
  step: { type: Number, required: true },
  description: { type: String, required: true },
});

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: false },
  cuisine: { type: String, required: false },
  ingredients: [ingredientSchema],
  instructions: [instructionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User
  createdAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
