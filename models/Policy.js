const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  policyholder_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Policyholder', required: true },
  coverage_amount: { type: Number, required: true }
});

module.exports = mongoose.model('Policy', PolicySchema);
