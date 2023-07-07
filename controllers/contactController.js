//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContact = (req, res) => {
  res.status(200).json({ message: "get all contacts" });
};

//@desc create new contacts
//@route POST /api/contacts
//@access public
const createContact = (req, res) => {
  res.status(201).json({ message: "create contact" });
};

//@desc get single contacts
//@route GET /api/contacts/:id
//@access public
const getSingleContact = (req, res) => {
  res.status(200).json({ message: `Get contact for ${req.params.id}` });
};
//@desc update contacts
//@route PUT /api/contacts/:id
//@access public
const updateContact = (req, res) => {
  res.status(200).json({ message: `update contact for ${req.params.id}` });
};

module.exports = { getContact, createContact, getSingleContact, updateContact };
