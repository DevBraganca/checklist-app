const mongoose = require('mongoose');

const ChecklistItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,  // Campo para indicar se o item foi confirmado
  }
});

module.exports = mongoose.model('ChecklistItem', ChecklistItemSchema);
