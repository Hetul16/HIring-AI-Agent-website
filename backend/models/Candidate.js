const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  relevance: String,
  score: Number,
  reasons: String,
  resume_text: String,
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;