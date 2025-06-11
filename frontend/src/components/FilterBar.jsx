import React, { useState, useEffect, useRef } from 'react';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css'; // Make sure styles are loaded

export default function FilterBar({ onFilterChange }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salary, setSalary] = useState([3, 5]); // in lakhs
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = noUiSlider.create(sliderRef.current, {
      start: salary,
      connect: true,
      tooltips: [true, true],
      range: { min: 0, max: 50 },
      step: 1,
      format: {
        to: value => Math.round(value),
        from: value => Number(value),
      },
    });

    slider.on('update', (values) => {
      const newSalary = values.map(v => Number(v));
      setSalary(prev => {
        if (prev[0] === newSalary[0] && prev[1] === newSalary[1]) return prev;
        return newSalary;
      });
    });

    return () => slider.destroy();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    onFilterChange({
      jobTitle: title,
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
      {/* Job Title Input */}
      <div className="flex-1 min-w-[150px]">
        <label className="sr-only" htmlFor="search-title">Search by title</label>
        <input
          id="search-title"
          type="text"
          placeholder="Search by Job Title, Role"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded"
        />
      </div>

      {/* Location Select */}
      <div className="flex-1 min-w-[120px]">
        <label className="sr-only" htmlFor="location">Preferred Location</label>
        <select
          id="location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="w-full px-3 py-2  bg-white text-gray-700"
        >
          <option value="">Location</option>
          <option>Chennai</option>
          <option>Hyderabad</option>
          <option>Bengaluru, IN</option>
          <option>Trichy</option>
        </select>
      </div>

      {/* Job Type Select */}
      <div className="flex-1 min-w-[120px]">
        <label className="sr-only" htmlFor="job-type">Job Type</label>
        <select
          id="job-type"
          value={jobType}
          onChange={e => setJobType(e.target.value)}
          className="w-full px-3 py-2  bg-white text-gray-700"
        >
          <option value="">Job type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>
      </div>

      {/* Salary Range Slider */}
      <div className="flex-1 min-w-[180px]">
        <div className="flex justify-between items-baseline">
          <label className="text-sm font-medium">Salary Per Month</label>
          <span className="text-sm text-gray-700">₹{salary[0]}L - ₹{salary[1]}L</span>
        </div>
        <div ref={sliderRef} className="mt-2" />
      </div>

      {/* Submit Filter */}
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
      >
        Filter
      </button>
    </form>
  );
}
