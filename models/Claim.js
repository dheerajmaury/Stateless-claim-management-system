const mongoose = require('mongoose');

const ClaimSchema = new mongoose.Schema({
  policy_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy', required: true },
  claim_amount: { type: Number, required: true }
});

module.exports = mongoose.model('Claim', ClaimSchema);
