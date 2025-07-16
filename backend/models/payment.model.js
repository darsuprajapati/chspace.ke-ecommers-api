const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Card', 'M-Pesa', 'Other'], required: true },
  cardHolderName: { type: String },
  email: { type: String },
  cardLast4: { type: String },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Completed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema); 