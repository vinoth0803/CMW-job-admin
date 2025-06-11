// src/components/JobCard.jsx
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  UserIcon,
  MapPinIcon,
  BriefcaseIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';

dayjs.extend(relativeTime);

export default function JobCard({
  job: {
    jobTitle,
    location,
    jobType,
    minSalary,
    maxSalary,
    createdAt,
    jobDescription = ''
  }
}) {
  // “24h ago” badge
  const timeAgo = dayjs(createdAt).fromNow(true) + ' ago';

  // Salary formatting
  const formatLPA = num => {
    const lpa = num / 100000;
    return Number.isInteger(lpa) ? lpa : lpa.toFixed(1);
  };
  const salaryRange = `${formatLPA(minSalary)}-${formatLPA(maxSalary)} LPA`;

  // Split description into bullets
  const points = jobDescription
    .split(/[\r\n]+|\./)
    .map(s => s.trim())
    .filter(Boolean);

  return (
    <div className="relative bg-white rounded-xl shadow-md p-5 flex flex-col">
      {/* timestamp */}
      <span className="absolute top-3 right-3 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-2 rounded-sm">
        {timeAgo}
      </span>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{jobTitle}</h3>

      {/* Meta row */}
      <ul className="flex flex-wrap items-center text-xs text-gray-600 space-x-2 mb-4">
        <li className="flex items-center space-x-1">
          <UserIcon className="h-4 w-4" />
          <span>1–3 yr Exp</span>
        </li>
        <li className="flex items-center space-x-1">
          <BriefcaseIcon className="h-4 w-4" />
          <span>{jobType}</span>
        </li>
        <li className="flex items-center space-x-1">
          <MapPinIcon className="h-4 w-4" />
          <span>{location}</span>
        </li>
        <li className="flex items-center space-x-1">
          <CurrencyRupeeIcon className="h-4 w-4" />
          <span>{salaryRange}</span>
        </li>
      </ul>

      {/* Description bullets */}
      <ul className="list-disc list-inside text-gray-700 mb-4 flex-1 overflow-y-auto max-h-32 pr-2">
  {points.map((pt, i) => (
    <li key={i} className="text-sm mb-1 break-words">{pt}</li>
  ))}
</ul>


      {/* Apply button */}
      <button className="mt-auto w-full py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
        Apply Now
      </button>
    </div>
  );
}
