const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  nom: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "Candidat", // Valeur par défaut pour le type
  },
  nomEntreprise: {
    type: String,
  },
});

// Méthode statique pour inscrire un utilisateur
userSchema.statics.inscrire = async function (
  nom,
  email,
  password,
  type,
  nomEntreprise
) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const utilisateur = await this.create({
    nom,
    email,
    password: hash,
    type,
    nomEntreprise,
  });

  return utilisateur;
};

// Méthode statique pour la connexion d'un utilisateur
userSchema.statics.Connexion = async function (email, password) {
  if (!email || !password) {
    throw Error("L'email et le mot de passe sont requis.");
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

module.exports = mongoose.model("User", userSchema);
