const express = require("express");
const router = express.Router();
const {
  getTravails,
  createTravail,
  deleteTravail,
} = require("../controllers/travail-controller");

// Route pour récupérer toutes les offres de travail
router.get("/", getTravails);

// Route pour créer une nouvelle offre de travail
router.post("/", createTravail);

// Route pour supprimer une offre de travail par ID
router.delete("/:id", deleteTravail);

module.exports = router;
