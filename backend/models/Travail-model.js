const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TravailSchema = new Schema({
  numero: { type: String, required: true },
  titre: { type: String, required: true },
  tauxHoraire: { type: String, required: true },
  des: { type: String, required: true },
});

module.exports = mongoose.model("Travail", TravailSchema);
