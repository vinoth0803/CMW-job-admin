// src/components/JobCard.jsx
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  UserIcon,
  MapPinIcon,
  BriefcaseIcon,
  Square3Stack3DIcon,
  BuildingOfficeIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';

dayjs.extend(relativeTime);

export default function JobCard({
  job: {
    jobTitle,
    jobType,
    minSalary,
    maxSalary,
    createdAt,
    jobDescription = ''
  }
}) {
  // “24h ago” badge


  const getShortTimeAgo = (date) => {
  const now = dayjs();
  const past = dayjs(date);
  const diffSeconds = now.diff(past, 'second');

  if (diffSeconds < 60) return `${diffSeconds}s ago`;

  const diffMinutes = now.diff(past, 'minute');
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = now.diff(past, 'hour');
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = now.diff(past, 'day');
  if (diffDays < 7) return `${diffDays}d ago`;

  const diffWeeks = now.diff(past, 'week');
  if (diffWeeks < 4) return `${diffWeeks}w ago`;

  const diffMonths = now.diff(past, 'month');
  if (diffMonths < 12) return `${diffMonths}mo ago`;

  const diffYears = now.diff(past, 'year');
  return `${diffYears}y ago`;
};

 const timeAgo = getShortTimeAgo(createdAt);


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

    const toTitleCase = str =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="relative bg-white rounded-xl shadow-md p-5 flex flex-col">
      {/* timestamp */}
      <span className="absolute top-3 right-3 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-2 rounded-sm">
        {timeAgo}
      </span>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{toTitleCase(jobTitle)}</h3>

      {/* Meta row */}
      <ul className="flex flex-wrap items-center text-sm text-gray-600 space-x-2 mb-4">
        <li className="flex items-center space-x-1">
          <UserIcon className="h-4 w-4" />
          <span>1–3 yr Exp</span>
        </li>
        <li className="flex items-center space-x-1">
          <BuildingOfficeIcon className="h-4 w-4" />
          <span>{jobType}</span>
        </li>
        
        <li className="flex items-center space-x-1">
          <Square3Stack3DIcon  className="h-4 w-4" />
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
      <button className="mt-auto w-full py-2 bg-[#00AAFF] text-white rounded-lg font-medium hover:bg-blue-600 transition">
        Apply Now
      </button>
    </div>
  );
}
