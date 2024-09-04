const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  fields: [
    {
      type: { type: String, required: true }, // e.g., 'text', 'checkbox', 'radio', 'file', 'image'
      label: { type: String, required: true },
      options: [String], // For multiple choice fields
    },
  ],
  responses: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      answers: [{ type: mongoose.Schema.Types.Mixed }], // Allow different types of responses
    },
  ],
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
