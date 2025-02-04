// routes/policyholderRoutes.js
const express = require('express');
const router = express.Router();
const Policyholder = require('../models/Policyholder');
const { generateId, validateRequestBody, policyholders } = require('../utils');

router.post('/', (req, res) => {
  const requiredFields = ['name', 'address'];
  const error = validateRequestBody(requiredFields, req.body);
  if (error) return res.status(400).json({ message: error });
  
  const id = generateId(policyholders);
  policyholders[id] = new Policyholder(id, req.body.name, req.body.address);
  res.status(201).json({ id, message: 'Policyholder created successfully' });
});

router.get('/:id', (req, res) => {
  const policyholder = policyholders[req.params.id];
  if (!policyholder) return res.status(404).json({ message: 'Policyholder not found' });
  res.json(policyholder);
});

router.put('/:id', (req, res) => {
  const policyholder = policyholders[req.params.id];
  if (!policyholder) return res.status(404).json({ message: 'Policyholder not found' });
  
  policyholder.name = req.body.name || policyholder.name;
  policyholder.address = req.body.address || policyholder.address;
  res.json({ message: 'Policyholder updated successfully' });
});

router.delete('/:id', (req, res) => {
  if (!policyholders[req.params.id]) return res.status(404).json({ message: 'Policyholder not found' });
  delete policyholders[req.params.id];
  res.json({ message: 'Policyholder deleted successfully' });
});

module.exports = router;
