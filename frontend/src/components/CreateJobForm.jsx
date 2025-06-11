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
      console.log('✅ Job created successfully');
      onJobCreated();
      onClose();
    } catch (error) {
      console.error('❌ Job creation failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-30 flex justify-center items-center px-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create New Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="jobTitle" placeholder="Job Title" className="input w-full" onChange={handleChange} required />
            <input type="text" name="companyName" placeholder="Company Name" className="input w-full" onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" className="input w-full" onChange={handleChange} required />
            
            <select
              name="jobType"
              value={formData.jobType}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={handleChange}
              required
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>

            <input type="number" name="minSalary" placeholder="Min Salary" className="input w-full" onChange={handleChange} required />
            <input type="number" name="maxSalary" placeholder="Max Salary" className="input w-full" onChange={handleChange} required />
            <input type="date" name="deadline" className="input w-full sm:col-span-2" onChange={handleChange} required />
          </div>

          <textarea name="jobDescription" placeholder="Job Description" className="textarea w-full" rows={3} onChange={handleChange} required />
          <textarea name="requirements" placeholder="Requirements (comma-separated)" className="textarea w-full" rows={2} onChange={handleChange} />
          <textarea name="responsibilities" placeholder="Responsibilities (comma-separated)" className="textarea w-full" rows={2} onChange={handleChange} />

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
