const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const UtilisateurRouter = require("./Routes/user-route");
const EntrepriseRouter = require("./Routes/Entreprise-route");
const Travail = require("./Routes/travail-route");

// Initialiser serveury
const app = express();

app.use(express.json());

// Utiliser le middleware CORS
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  console.log(req.body);
  next();
});

app.use("/api/EntrepriseRouter", EntrepriseRouter);
app.use("/api/utilisateur", UtilisateurRouter);
app.use("/api/Travail", Travail);

if (!process.env.MONG_URI) {
  console.error("MONGO_URI is not defined in the environment variables");
  process.exit(1);
}

mongoose
  .connect(process.env.MONG_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connecté à la base de données MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Serveur est connecté au port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB:", err);
  });

// Parser et ajouter une propriété body sur la request
app.use(express.json());
