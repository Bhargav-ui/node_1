const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();
const {
  getContact,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

//modle1
// router.route("/").get((req, res) => {
//   // res.send("Get all contacts");
//   // res.json({ message: "Get all contacts" });

//   res.status(200).json({ message: "Get all contacts" });
// });

// modle2
// router.route("/").get(getContact);

// router.route("/").post(createContact);

//modle3

router.use(validateToken);

router.route("/").get(getContact).post(createContact);

router
  .route("/:id")
  .get(getSingleContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
