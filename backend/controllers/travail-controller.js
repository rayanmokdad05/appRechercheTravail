const Travail = require("../models/Travail-model");

// Récupérer toutes les offres de travail
const getTravails = async (req, res) => {
  try {
    const travails = await Travail.find();
    res.status(200).json(travails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une nouvelle offre de travail
const createTravail = async (req, res) => {
  const { numero, title, description } = req.body;
  console.log("Request body:", req.body); // Log request body for debugging
  try {
    const newTravail = new Travail({ numero, title, description });
    await newTravail.save();
    res.status(201).json(newTravail);
  } catch (error) {
    console.error("Error creating new offer:", error.message); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une offre de travail par ID
const deleteTravail = async (req, res) => {
  const { id } = req.params;
  try {
    const travail = await Travail.findByIdAndDelete(id);
    if (!travail) {
      return res.status(404).json({ message: "Travail non trouvé" });
    }
    res.status(200).json({ message: "Travail supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTravails,
  createTravail,
  deleteTravail,
};
