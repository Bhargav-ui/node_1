const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ message: contacts });
});

//@desc create new contacts
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id, //getting the current logged in users _id from
  });
  res.status(201).json({ message: contact });
});

//@desc get single contacts
//@route GET /api/contacts/:id
//@access public
const getSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`No such contact with id:${req.params.id}`);
  }
  res.status(200).json({ message: contact });
});
//@desc update contacts
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  console.log("update 1");
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`No such contact with id:${req.params.id}`);
  }
  console.log("update 2", contact);
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User should not have permission to update other uer contacts"
    );
  }

  console.log("update 3");
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ message: updatedContact });
});

const deleteContact = asyncHandler(async (req, res) => {
  console.log("del 1");
  const contact = await Contact.findById(req.params.id);
  console.log("del 2", contact);
  if (!contact) {
    console.log("del 3");
    res.status(404);
    throw new Error("no such contact");
  }
  console.log("del 4");

  if (contact.user_id.toString() !== req.user.id) {
    console.log("del 5");

    res.status(403);
    throw new Error(
      "User should not have permission to update other uer contacts"
    );
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
