const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobTitle:     { type: String, required: true },
  companyName:  { type: String, required: true },
  location:     { type: String, required: true },
  jobType:      { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], required: true },
  minSalary:    { type: Number, required: true },
  maxSalary:    { type: Number, required: true },
  deadline:     { type: Date, required: true },
  jobDescription: { type: String, required: true },
  requirements:    { type: String, required: true },  // Added field
  responsibilities:{ type: String, required: true },  // Added field
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
