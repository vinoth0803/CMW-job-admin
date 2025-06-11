const express = require('express');
const router = express.Router();    
const Job = require('../models/Job');

// Create a new job
router.post('/create', async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      location,
      jobType,
      minSalary,
      maxSalary,
      deadline,
      jobDescription,
      requirements,         // Added
      responsibilities      // Added
    } = req.body;

    const job = new Job({
      jobTitle : jobTitle.toLowerCase(),
      companyName,
      location,
      jobType,
      minSalary: Number(minSalary),
      maxSalary: Number(maxSalary),
      deadline: new Date(deadline),
      jobDescription,
      requirements,         // Added
      responsibilities      // Added
    });

    await job.save();
    console.log('✅ Job created successfully:', job);
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// Get all jobs with filters

// Get all jobs with filters
router.get('/', async (req, res) => {
  try {
    const filters = [];

    // 🔍 Job Title (partial match)
    if (req.query.jobTitle) {
      filters.push({
        jobTitle: { $regex: req.query.jobTitle, $options: 'i' },
      });
    }

    // 🏢 Company Name (partial match)
    if (req.query.company) {
      filters.push({
        companyName: { $regex: req.query.company, $options: 'i' },
      });
    }

    // 📍 Location (partial match)
    if (req.query.location) {
      filters.push({
        location: { $regex: req.query.location, $options: 'i' },
      });
    }

    // 🧑‍💻 Job Type (exact match)
    if (req.query.jobType) {
      filters.push({
        jobType: req.query.jobType,
      });
    }

    // 💰 Salary Range (robust check)
    const minSalary = parseInt(req.query.minSalary);
    const maxSalary = parseInt(req.query.maxSalary);

    if (!isNaN(minSalary) && !isNaN(maxSalary)) {
      filters.push({
        $and: [
          { minSalary: { $gte: minSalary } },
          { maxSalary: { $lte: maxSalary } },
        ],
      });
    }

    // 🔍 Fetch jobs based on filters
    const query = filters.length > 0 ? { $and: filters } : {};
    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json(jobs);
    console.log('✅ Filtered jobs fetched successfully:', jobs.length);
  } catch (error) {
    console.error('❌ Error fetching filtered jobs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});





module.exports = router;
