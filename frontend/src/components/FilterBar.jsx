import React, { useState, useEffect, useRef } from 'react';
import noUiSlider from 'nouislider';


export default function FilterBar({ onFilterChange }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salary, setSalary] = useState([3, 5]); // in lakhs
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    // Initialize noUiSlider
    const slider = noUiSlider.create(sliderRef.current, {
  start: salary,
  connect: true,
  tooltips: [true, true],
  range: { min: 0, max: 50 }, // Max ₹50L/year
  step: 1,
  format: {
    to: value => Math.round(value),   // Just a number, no "L"
    from: value => Number(value)      // Safe conversion
  }
});



    // Sync slider → React state
    slider.on('update', (values) => {
      setSalary(values.map(v => Number(v)));
    });

    // Cleanup on unmount
    return () => slider.destroy();
  }, [salary]);

  const handleSubmit = e => {
    e.preventDefault();
    onFilterChange({
    jobTitle: title, // ✅ FIXED
    location,
    jobType,
    minSalary: salary[0] * 100000,
    maxSalary: salary[1] * 100000,
});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 max-w-7xl mx-auto flex flex-col mt-5 md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"
    >
      {/* Search by Title */}
      <div className="flex-1 min-w-[150px]">
        <label className="sr-only" htmlFor="search-title">Search by title</label>
        <input
          id="search-title"
          type="text"
          placeholder="Search by Job Title, Role"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full  px-3 py-2 focus:outline-none "
        />
      </div>

      {/* Preferred Location */}
      <div className="flex-1 min-w-[120px]">
        <label className="sr-only" htmlFor="location">Preferred Location</label>
        <select
          id="location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="w-full  px-3 py-2 bg-white text-gray-500"
        >
          <option value="">Location</option>
          <option>Chennai</option>
          <option>Hyderabad</option>
          <option>Bengaluru, IN</option>
          <option>Trichy</option>
        </select>
      </div>

      {/* Job Type */}
      <div className="flex-1 min-w-[120px]">
        <label className="sr-only" htmlFor="job-type">Job Type</label>
        <select
          id="job-type"
          value={jobType}
          onChange={e => setJobType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="">Job type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>
      </div>

      {/* Salary Range Slider */}
      <div className="flex-1 min-w-[150px]">
        <div className="flex justify-between items-baseline">
          <label className="text-sm font-medium">Salary Per Month</label>
          <span className="text-sm text-gray-700">₹{salary[0]}L - ₹{salary[1]}L</span>
        </div>
        <div
          ref={sliderRef}
          className="noUi-target mt-2"
          style={{ position: 'relative' }}
        />
      </div>

      {/* Filter Button */}
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
      >
        Filter
      </button>
    </form>
  );
}
