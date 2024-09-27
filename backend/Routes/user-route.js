const express = require("express");
const {
  signupUser,
  connexion,
  updateUser,
  deleteUser,
} = require("../controllers/user-controller");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", connexion);
router.put("/update/:uid", updateUser);
router.delete("/delete/:uid", deleteUser);

module.exports = router;
