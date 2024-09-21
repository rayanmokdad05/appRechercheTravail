const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const travailController = require("../controllers/travail-controller");

const valid = [
  check("nom").notEmpty().withMessage("Le nom est requis."),
  check("des").notEmpty().withMessage("Le numero de telephone est requis."),
  check("des").notEmpty().withMessage("La description est requise."),
  check("genre").notEmpty().withMessage("Le genre est requis."),
];

// Route pour obtenir tous les travail
router.get("/", travailController.getTravaux);

// Route pour créer un nouveau travail
router.post("/", valid, travailController.createTravail);

// Route pour supprimer un travail
router.delete("/:id", travailController.deleteTravail);

module.exports = router;
