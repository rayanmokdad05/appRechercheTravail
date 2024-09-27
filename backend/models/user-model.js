const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const utilisateurSchema = new Schema({
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
  type: {
    type: String,
    default: "Candidat",
  },
  nomEntreprise: {
    type: String,
    default: "",
  },
});

// Static method to register a user
utilisateurSchema.statics.inscrire = async function (nom, email, password, type, nomEntreprise) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const utilisateur = await this.create({ nom, email, password: hash, type, nomEntreprise });

  return utilisateur;
};

utilisateurSchema.statics.Connexion = async function (email, password) {
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

module.exports = mongoose.model("Utilisateur", utilisateurSchema);

