import React, { useState, useEffect, useRef } from 'react';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export default function FilterBar({ onFilterChange }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salary, setSalary] = useState([0, 5]);
  const sliderRef = useRef(null);
  const debounceTimeout = useRef(null);

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

  // 🔁 Debounced filter handler
  useEffect(() => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      onFilterChange({
        jobTitle: title,
        location,
        jobType,
        minSalary: salary[0] * 100000,
        maxSalary: salary[1] * 100000,
      });
    }, 400); // debounce in ms
  }, [title, location, jobType, salary]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-7xl overflow-x-hidden mx-auto flex flex-col mt-5 md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex-1 min-w-[150px]">
        <input
          type="text"
          placeholder="Search by Job Title, Role"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded"
        />
      </div>

      <div className="flex-1 min-w-[120px]">
        <select
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="w-full px-3 py-2 bg-white text-gray-700"
        >
          <option value="">Location</option>
          <option>Chennai</option>
          <option>Hyderabad</option>
          <option>Bengaluru, IN</option>
          <option>Trichy</option>
        </select>
      </div>

      <div className="flex-1 min-w-[120px]">
        <select
          value={jobType}
          onChange={e => setJobType(e.target.value)}
          className="w-full px-3 py-2 bg-white text-gray-700"
        >
          <option value="">Job type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>
      </div>

      <div className="flex-1 min-w-[180px]">
  <div className="flex justify-between items-baseline mb-1">
    <label className="text-sm font-medium">Salary Per Month</label>
    <span className="text-sm text-gray-700">₹{salary[0]}L - ₹{salary[1]}L</span>
  </div>
  <div
    ref={sliderRef}
    className="mt-1 w-full h-[6px] rounded bg-gray-200" // fixed height + full width + style
    style={{ maxWidth: '100%' }}
  />
</div>

    </div>
  );
}
