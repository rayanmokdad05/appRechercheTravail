const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Fonction pour créer un token JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Inscription d'un utilisateur
const signupUser = async (req, res) => {
  const { nom, email, password, type, nomEntreprise } = req.body;

  try {
    // Utiliser la méthode statique inscrire du modèle User
    const user = await User.inscrire(nom, email, password, type, nomEntreprise);

    // Créer un token JWT
    const token = createToken(user._id);

    // Répondre avec l'email, le token et l'ID utilisateur
    res.status(201).json({ email, token, userId: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Connexion d'un utilisateur
const connexion = async (req, res) => {
  const { email, password } = req.body;

  try {
    const utilisateur = await User.Connexion(email, password);
    const token = createToken(utilisateur._id);
    res.status(200).json({ utilisateur, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mise à jour des informations d'un utilisateur
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nom, email, nomEntreprise } = req.body;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { nom, email, nomEntreprise },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Aucun utilisateur trouvé" });
    }

    res
      .status(200)
      .json({
        message: "Utilisateur mis à jour avec succès",
        user: updatedUser,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Suppression d'un utilisateur
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Aucun utilisateur trouvé" });
    }

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

module.exports = {
  signupUser,
  connexion,
  updateUser,
  deleteUser,
};
