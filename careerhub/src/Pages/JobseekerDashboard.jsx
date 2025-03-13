import React from "react";
import { Navigationbar } from "../Components/index";
import { JobList, SingleJob, Profile } from "../Components/index";
import { Route, Routes } from "react-router-dom";
const JobseekerDashboard = () => {
  return (
    <>
      <Navigationbar />
      <Routes>
        <Route index element={<JobList />} />
        <Route path="job/:id" element={<SingleJob />} />
      </Routes>
    </>
  );
};

export default JobseekerDashboard;
