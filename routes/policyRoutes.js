// routes/policyRoutes.js
const express = require('express');
const router = express.Router();
const Policy = require('../models/Policy');
const { generateId, validateRequestBody, policies, policyholders } = require('../utils');

router.post('/', (req, res) => {
  const requiredFields = ['policyholder_id', 'coverage_amount'];
  const error = validateRequestBody(requiredFields, req.body);
  if (error) return res.status(400).json({ message: error });
  
  if (!policyholders[req.body.policyholder_id]) {
    return res.status(404).json({ message: 'Policyholder not found' });
  }

  const id = generateId(policies);
  policies[id] = new Policy(id, req.body.policyholder_id, req.body.coverage_amount);
  res.status(201).json({ id, message: 'Policy created successfully' });
});

router.get('/:id', (req, res) => {
  const policy = policies[req.params.id];
  if (!policy) return res.status(404).json({ message: 'Policy not found' });
  res.json(policy);
});

router.put('/:id', (req, res) => {
  const policy = policies[req.params.id];
  if (!policy) return res.status(404).json({ message: 'Policy not found' });
  
  policy.coverage_amount = req.body.coverage_amount || policy.coverage_amount;
  res.json({ message: 'Policy updated successfully' });
});

router.delete('/:id', (req, res) => {
  if (!policies[req.params.id]) return res.status(404).json({ message: 'Policy not found' });
  delete policies[req.params.id];
  res.json({ message: 'Policy deleted successfully' });
});

module.exports = router;
