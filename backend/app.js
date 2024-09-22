const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UtilisateurRouter = require("./Routes/user-route");
const EntrepriseRouter = require("./Routes/Entreprise-route");
const Travail = require("./Routes/travail-route");

//initialiser serveur
const app = express();

app.use(express.json());

// Utiliser le middleware CORS
app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/RechercheTravailProjet";

app.use("/api/EntrepriseRouter", EntrepriseRouter);
app.use("/api/utilisateur", UtilisateurRouter);
app.use("/api/Travail", Travail);

// établir une connexion à la BD
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("succès de la mise en place du serveur 5000");
    app.listen(PORT, () => {
      console.log("");
    });
  })
  .catch((err) => {
    console.error("échec de la connexion", err);
  });

//parser et ajouter une propriété body sur la request
app.use(express.json());
