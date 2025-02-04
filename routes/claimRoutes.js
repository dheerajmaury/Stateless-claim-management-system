// routes/claimRoutes.js
const express = require('express');
const router = express.Router();
const Claim = require('../models/Claim');
const { generateId, validateRequestBody, claims, policies } = require('../utils');

router.post('/', (req, res) => {
  const requiredFields = ['policy_id', 'claim_amount'];
  const error = validateRequestBody(requiredFields, req.body);
  if (error) return res.status(400).json({ message: error });
  
  const policy = policies[req.body.policy_id];
  if (!policy) return res.status(404).json({ message: 'Policy not found' });
  
  if (req.body.claim_amount > policy.coverage_amount) {
    return res.status(400).json({ message: 'Claim amount cannot exceed policy coverage amount' });
  }

  const id = generateId(claims);
  claims[id] = new Claim(id, req.body.policy_id, req.body.claim_amount);
  res.status(201).json({ id, message: 'Claim created successfully' });
});

router.get('/:id', (req, res) => {
  const claim = claims[req.params.id];
  if (!claim) return res.status(404).json({ message: 'Claim not found' });
  res.json(claim);
});

router.put('/:id', (req, res) => {
  const claim = claims[req.params.id];
  if (!claim) return res.status(404).json({ message: 'Claim not found' });
  
  claim.claim_amount = req.body.claim_amount || claim.claim_amount;
  res.json({ message: 'Claim updated successfully' });
});

router.delete('/:id', (req, res) => {
  if (!claims[req.params.id]) return res.status(404).json({ message: 'Claim not found' });
  delete claims[req.params.id];
  res.json({ message: 'Claim deleted successfully' });
});

module.exports = router;
