const Travail = require("../models/Travail-model");

//get = obtenir les travails
const getTravaux = async (req, res, next) => {
  try {
    const travaux = await Travail.find({});
    const response = travaux.length
      ? {
          travaux: travaux.map((Travail) =>
            Travail.toObject({ getters: true })
          ),
        }
      : { message: "Pas de travaux." };
    res.json(response);
  } catch (err) {
    res.status(500).json({
      message: "ERREUR! Travail non retrouvé.",
      error: err.message,
    });
  }
};

//post = créer un Travail
const createTravail = async (req, res, next) => {
  const { nom, des, genre } = req.body;
  const createdTravail = new Travail({
    nom,
    des,
    genre,
  });
  try {
    await createdTravail.save();
  } catch (error) {
    console.error(error); // Log the actual error
    return next(new Error("Erreur! Travail non créé."));
  }
  res.status(201).json({ Travail: createdTravail });
};

//Delete = suppression des travaux
const deleteTravail = async (req, res, next) => {
  const travailId = req.params.id;
  try {
    const Travail = await Travail.findByIdAndDelete(travailId);
    if (!Travail) {
      return next(new Error("Travail non trouvé."));
    }
    res.status(200).json({ message: "Travail supprimé" });
  } catch (err) {
    console.log(err);
    return next(new Error("ERREUR! Travail non supprimé."));
  }
};

exports.getTravaux = getTravaux;
exports.createTravail = createTravail;
exports.deleteTravail = deleteTravail;
