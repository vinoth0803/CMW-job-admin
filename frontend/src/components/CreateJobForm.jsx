import React, { useState } from 'react';
import api from '../api';

export default function CreateJobForm({ onClose, onJobCreated }) {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobType: '',
    minSalary: '',
    maxSalary: '',
    deadline: '',
    jobDescription: '',
    requirements: '',
    responsibilities: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/jobs/create', formData);
      onJobCreated();
      onClose();
    } catch (error) {
      console.error('❌ Job creation failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-30 flex justify-center items-center px-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Job Opening</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Job Title */}
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium mb-1">Job Title</label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                placeholder="Full Stack Developer"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                required
              />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium mb-1">Company Name</label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Amazon"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                required
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Chennai"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                required
              />
            </div>

            {/* Job Type */}
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium mb-1">Job Type</label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Salary Range */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Salary Range (₹/month)</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  id="minSalary"
                  name="minSalary"
                  type="number"
                  placeholder="₹ 0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={handleChange}
                  required
                />
                <input
                  id="maxSalary"
                  name="maxSalary"
                  type="number"
                  placeholder="₹ 12,00,000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Deadline */}
            <div className="sm:col-span-2">
              <label htmlFor="deadline" className="block text-sm font-medium mb-1">Application Deadline</label>
              <input
                id="deadline"
                name="deadline"
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label htmlFor="jobDescription" className="block text-sm font-medium mb-1">Job Description</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              placeholder="Please share a description to let the candidate know what this role entails."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              required
            />
          </div>

          {/* Requirements */}
          <div>
            <label htmlFor="requirements" className="block text-sm font-medium mb-1">Requirements</label>
            <textarea
              id="requirements"
              name="requirements"
              placeholder="List the must-haves (comma-separated)"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label htmlFor="responsibilities" className="block text-sm font-medium mb-1">Responsibilities</label>
            <textarea
              id="responsibilities"
              name="responsibilities"
              placeholder="What will they own? (comma-separated)"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Save Draft ▾
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#00AAFF] text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Publish »
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
