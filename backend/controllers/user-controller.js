const Utilisateur = require("../models/user-model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const createToken = (_id) => {
  return jwt.sign({ _id }, "asdasdasd", { expiresIn: "3d" });
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

// Inscrire
const InscrireUti = async (req, res) => {
  const { nom, email, password } = req.body;

  try {
    const utilisateur = await Utilisateur.inscrire(nom, email, password); 
// Créer un token
const token = createToken(user._id);
    res.status(200).json({ nom, email, utilisateur });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const UserInfo = async (req, res) => {
  const { uid } = req.params;

  try {
    if (!ObjectId.isValid(uid)) {
      // Validate uid before querying
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

// pour mettre a jour les informations de l'utilisateur
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

// pour supprimer le compte de l'utilisateur
const DeleteUser = async (req, res, next) => {
  const { uid } = req.params;

  try {
    if (!ObjectId.isValid(uid)) {
      return res.status(400).json({ error: "Invalid user ID " });
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
