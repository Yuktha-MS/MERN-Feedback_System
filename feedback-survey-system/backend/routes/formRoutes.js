const express = require('express');
const Form = require('../models/Form');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new form
router.post('/create', protect, async (req, res) => {
  const { title, description, fields } = req.body;
  const userId = req.user.userId;

  try {
    const form = new Form({ userId, title, description, fields });
    await form.save();
    res.status(201).json({ message: 'Form created successfully', form });
  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ message: 'Error creating form', error });
  }
});

// Get all forms for a specific user
router.get('/user', protect, async (req, res) => {
  const userId = req.user.userId;

  try {
    const forms = await Form.find({ userId });
    res.json(forms);
  } catch (error) {
    console.error('Error retrieving forms:', error);
    res.status(500).json({ message: 'Error retrieving forms', error });
  }
});

// Get a specific form by ID
router.get('/:formId', protect, async (req, res) => {
  const { formId } = req.params;

  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    console.error('Error retrieving form:', error);
    res.status(500).json({ message: 'Error retrieving form', error });
  }
});

module.exports = router;
