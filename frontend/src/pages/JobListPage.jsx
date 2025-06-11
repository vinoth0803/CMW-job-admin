import React, { useEffect, useState } from 'react';
import api from '../api'; // Adjust the import based on your API setup
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import JobCard from '../components/JobCard';
import CreateJobForm from '../components/CreateJobForm';

export default function JobListPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [jobUpdated, setJobUpdated] = useState(false); // 🔥 added flag

  const fetchJobs = async (filters = {}) => {
    setLoading(true);
    try {
      const resp = await api.get('/jobs', { params: filters });
      const data = Array.isArray(resp.data) ? resp.data : [];
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ only runs when jobUpdated toggles
  useEffect(() => {
    fetchJobs();
  }, [jobUpdated]);

  return (
    <>
      <div className={showModal ? 'blur-sm pointer-events-none select-none transition-all duration-300' : 'transition-all duration-300'}>
        <Navbar onCreateJobClick={() => setShowModal(true)} />
        <FilterBar onFilterChange={fetchJobs} />

        <div className="max-w-6xl mx-auto p-4">
          {loading && <p className="text-center text-gray-500">Loading jobs…</p>}

          {!loading && jobs.length === 0 && (
            <p className="text-center text-gray-500">
              No jobs found. Try adjusting your filters.
            </p>
          )}

          {!loading && Array.isArray(jobs) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <CreateJobForm
            onClose={() => setShowModal(false)}
            onJobCreated={() => {
              setShowModal(false);
              setJobUpdated(prev => !prev); // 🔥 toggle flag instead of calling fetchJobs directly
            }}
          />
        </div>
      )}
    </>
  );
}

