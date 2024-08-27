const express = require('express');
const router = express.Router();
const ChecklistItem = require('../models/ChecklistItem');

// Adicionar novo item ao checklist
router.post('/', async (req, res) => {
  try {
    const newItem = new ChecklistItem({ description: req.body.description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter todos os itens do checklist
router.get('/', async (req, res) => {
  try {
    const items = await ChecklistItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar item (marcar como confirmado)
router.put('/:id/confirm', async (req, res) => {
  try {
    const updatedItem = await ChecklistItem.findByIdAndUpdate(
      req.params.id,
      { confirmed: req.body.confirmed },
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: "Item não encontrado" });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar item do checklist
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await ChecklistItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item não encontrado" });
    res.json({ message: "Item deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
