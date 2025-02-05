const express = require('express');
const Policy = require('../models/Policy');

const router = express.Router();

// Create a new policy
router.post('/', async (req, res) => {
  try {
    const { policyholder_id, coverage_amount } = req.body;
    const policy = new Policy({ policyholder_id, coverage_amount });
    await policy.save();
    res.status(201).json(policy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all policies
router.get('/', async (req, res) => {
  try {
    const policies = await Policy.find().populate('policyholder_id');
    res.json(policies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single policy by ID
router.get('/:id', async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id).populate('policyholder_id');
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.json(policy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a policy by ID
router.put('/:id', async (req, res) => {
  try {
    const { policyholder_id, coverage_amount } = req.body;
    const updatedPolicy = await Policy.findByIdAndUpdate(
      req.params.id,
      { policyholder_id, coverage_amount },
      { new: true, runValidators: true }
    );
    if (!updatedPolicy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.json(updatedPolicy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a policy by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPolicy = await Policy.findByIdAndDelete(req.params.id);
    if (!deletedPolicy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.json({ message: 'Policy deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
