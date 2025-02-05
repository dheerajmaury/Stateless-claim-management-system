const express = require('express');
const Claim = require('../models/Claim');
const Policy = require('../models/Policy'); // Import the Policy model

const router = express.Router();

// Create a new claim with validation
router.post('/', async (req, res) => {
  try {
    const { policy_id, claim_amount } = req.body;

    // Fetch the related policy to get the coverage amount
    const policy = await Policy.findById(policy_id);
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    // Validate claim amount
    if (claim_amount > policy.coverage_amount) {
      return res.status(400).json({ message: 'Claim amount exceeds coverage amount' });
    }

    // Create and save the claim
    const claim = new Claim({ policy_id, claim_amount });
    await claim.save();
    res.status(201).json(claim);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a claim with validation
router.put('/:id', async (req, res) => {
  try {
    const { policy_id, claim_amount } = req.body;

    // Fetch the related policy
    const policy = await Policy.findById(policy_id);
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    // Validate claim amount
    if (claim_amount > policy.coverage_amount) {
      return res.status(400).json({ message: 'Claim amount exceeds coverage amount' });
    }

    // Update the claim
    const updatedClaim = await Claim.findByIdAndUpdate(
      req.params.id,
      { policy_id, claim_amount },
      { new: true, runValidators: true }
    );

    if (!updatedClaim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    res.json(updatedClaim);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
