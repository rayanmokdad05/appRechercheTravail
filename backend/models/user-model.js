const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true],
    minlength: 8,
  },
  nom: {
    type: String,
    default: "",
  },
});
usersSchema.statics.inscrire = async function (nom, email, password) {
  if (!email || !password) {
    throw Error("L'email et le mot de passe sont requis.");
  }

  const existant = await this.findOne({ email });

  if (existant) {
    throw Error("Un compte avec cet email existe déjà.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Set nom to an empty string if it's not provided
  const utilisateur = await this.create({
    nom: nom || "",
    email,
    password: hash,
  });

  return utilisateur;
};

usersSchema.statics.Connexion = async function (email, password) {
  if (!email || !password) {
    throw Error("Les cases doivent etre remplit.");
  }

  const utilisateur = await this.findOne({ email });
  if (!utilisateur) {
    throw Error("le courriel est incorrect");
  }

  const meme = await bcrypt.compare(password, utilisateur.password);
  if (!meme) {
    throw Error("Incorrect password");
  }

  return utilisateur;
};

module.exports = mongoose.model("Users", usersSchema);
