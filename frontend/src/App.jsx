// src/App.jsx
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import JobListPage from './pages/JobListPage';
// import CreateJobPage from './pages/CreateJobPage';

// A shared layout that always shows the Navbar
function Layout() {
  return (
    <>
      {/* <Navbar /> */}
      <main className="pt-4">
        <Outlet />
      </main>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Wrap your pages in the Layout via nesting */}
      <Route element={<Layout />}>
        <Route path="/" element={<JobListPage />} />
        {/* <Route path="/create-job" element={<CreateJobPage />} /> */}
      </Route>
    </Routes>
  );
}
