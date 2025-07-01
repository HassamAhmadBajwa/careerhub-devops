import React from "react";
import { Navigationbar } from "../Components/index";
import { JobList, SingleJob, AppliedJobs } from "../Components/index";
import { Route, Routes } from "react-router-dom";
const JobseekerDashboard = () => {
  return (
    <>
      <Navigationbar />
      <Routes>
        <Route index element={<JobList />} />
        <Route path="job/:id" element={<SingleJob />} />
        <Route path="applied-jobs" element={<AppliedJobs />} />
      </Routes>
    </>
  );
};

export default JobseekerDashboard;
