const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

// POST contact
router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET contacts newest first
// GET contacts sorted by name/date
router.get("/", async (req, res) => {
  const { sort } = req.query;
  let sortObj = { createdAt: -1 }; // default: newest first

  if (sort === "name_asc") sortObj = { name: 1 };
  if (sort === "name_desc") sortObj = { name: -1 };
  if (sort === "date_asc") sortObj = { createdAt: 1 };
  if (sort === "date_desc") sortObj = { createdAt: -1 };

  const contacts = await Contact.find().sort(sortObj);
  res.json(contacts);
});



// DELETE contact
router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted" });
});

module.exports = router;
