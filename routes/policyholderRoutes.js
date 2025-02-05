const express = require('express');
const Policyholder = require('../models/Policyholder');

const router = express.Router();

// Create a new policyholder
router.post('/', async (req, res) => {
  const { name, address } = req.body;
  const policyholder = new Policyholder({ name, address });
  await policyholder.save();
  res.status(201).json(policyholder);
});

// Get all policyholders
router.get('/', async (req, res) => {
  const policyholders = await Policyholder.find();
  res.json(policyholders);
});

// Get a policyholder by ID
router.get('/:id', async (req, res) => {
  try {
    const policyholder = await Policyholder.findById(req.params.id);
    if (!policyholder) {
      return res.status(404).json({ message: 'Policyholder not found' });
    }
    res.json(policyholder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a policyholder by ID
router.put('/:id', async (req, res) => {
  try {
    const policyholder = await Policyholder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!policyholder) {
      return res.status(404).json({ message: 'Policyholder not found' });
    }
    res.json(policyholder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a policyholder by ID
router.delete('/:id', async (req, res) => {
  try {
    const policyholder = await Policyholder.findByIdAndDelete(req.params.id);
    if (!policyholder) {
      return res.status(404).json({ message: 'Policyholder not found' });
    }
    res.json({ message: 'Policyholder deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;