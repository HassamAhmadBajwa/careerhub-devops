import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleJobQuery } from "../redux/api/jobsApi";
import { Spinner } from "react-bootstrap";

const SingleJob = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleJobQuery(id);

  if (isLoading) return <Spinner animation="center" />;
  if (error) return <p className="text-danger">Failed to load</p>;
  return (
    <div className="container mt-4">
      <h2>{data.job.title}</h2>
      <p>
        <strong>Company:</strong> {data.job.companyName}
      </p>
      <p>
        <strong>Requirements:</strong> {data.job.requirements}
      </p>
      <p>
        <strong>Salary:</strong> {data.job.salaryRange}
      </p>
      <p>
        <strong>Job Type:</strong> {data.job.jobType}
      </p>
      <p>
        <strong>Application Deadline:</strong>{" "}
        {new Date(data.job.applicationDeadline).toLocaleDateString()}
      </p>
      <button className="btn btn-success">Apply Now</button>
    </div>
  );
};

export default SingleJob;
