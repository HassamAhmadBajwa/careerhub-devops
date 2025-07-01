import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleJobQuery } from "../redux/api/jobApi";
import { PostJob } from "./index";

const EditJob = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleJobQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (error || !data?.job) return <p>Job not found</p>;

  return <PostJob isEdit={true} jobData={data.job} />;
};

export default EditJob;
