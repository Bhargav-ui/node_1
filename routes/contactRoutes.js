const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
} = require("../controllers/contactController");

// router.route("/").get((req, res) => {
//   // res.send("Get all contacts");
//   // res.json({ message: "Get all contacts" });

//   res.status(200).json({ message: "Get all contacts" });
// });

router.route("/").get(getContact);

router.route("/").post(createContact);

router.route("/:id").get((req, res) => {
  res.status(200).json({ message: `Get contact for ${req.params.id}` });
});

router.route("/:id").put((req, res) => {
  res.status(200).json({ message: `update contact for ${req.params.id}` });
});

router.route("/:id").delete((req, res) => {
  res.status(200).json({ message: `delete contact for ${req.params.id}` });
});

module.exports = router;
