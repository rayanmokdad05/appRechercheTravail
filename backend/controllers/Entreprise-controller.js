const Utilisateur = require("../models/user-model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Générer un token JWT
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET || "asdasdasd", {
    expiresIn: "3d",
  });
};

// Connexion
const ConnexionUti = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Effectue l'authentification
    const user = await Utilisateur.Connexion(email, password);

    // Génère un jeton JWT
    const token = createToken(user._id);

    res.status(200).json({ email, token, userId: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Inscription
const InscrireUti = async (req, res) => {
  const { nom, email, password } = req.body;

  try {
    const utilisateur = await Utilisateur.inscrire(nom, email, password);

    // Générer un token après l'inscription
    const token = createToken(utilisateur._id);

    res.status(200).json({ nom, email, token, userId: utilisateur._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer les infos de l'utilisateur
const UserInfo = async (req, res) => {
  const { uid } = req.params;

  try {
    if (!ObjectId.isValid(uid)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const userFound = await Utilisateur.findById(uid);
    if (userFound) {
      res.json(userFound);
    } else {
      res.status(404).json({ message: "Aucun utilisateur trouvé" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Mise à jour des infos
const UpdateUser = async (req, res, next) => {
  const { uid } = req.params;
  const { nom, email } = req.body;

  try {
    const updatedFields = {};
    if (nom) updatedFields.nom = nom;
    if (email) updatedFields.email = email;

    if (!ObjectId.isValid(uid)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const updatedUser = await Utilisateur.findByIdAndUpdate(
      uid,
      updatedFields,
      { new: true }
    );
    res.status(200).json({
      message: "Informations utilisateur mises à jour avec succès",
      utilisateur: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Suppression du compte utilisateur
const DeleteUser = async (req, res, next) => {
  const { uid } = req.params;

  try {
    if (!ObjectId.isValid(uid)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    await Utilisateur.findByIdAndDelete(uid);
    res
      .status(200)
      .json({ message: "Compte utilisateur supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

module.exports = {
  ConnexionUti,
  InscrireUti,
  UserInfo,
  UpdateUser,
  DeleteUser,
};
