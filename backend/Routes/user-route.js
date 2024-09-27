const express = require("express");
const router = express.Router();
const control = require("../controllers/user-controller");

//connection et inscription
router.post("/Login", control.ConnexionUti);
router.post("/signup", control.InscrireUti);


//page profile
router.get("/UserInfo/:uid", control.UserInfo);
router.patch("/Update/:uid", control.UpdateUser);
router.delete("/Delete/:uid", control.DeleteUser);

module.exports = router;
