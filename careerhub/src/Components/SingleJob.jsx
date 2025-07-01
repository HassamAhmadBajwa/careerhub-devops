import React, { useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleJobQuery } from "../redux/api/jobsApi";
import {
  useApplyToJobMutation,
  useCheckIfAppliedQuery,
} from "../redux/api/applicationJobsApi";
import { useSelector } from "react-redux";
import { Row, Col, Button, Spinner, Form } from "react-bootstrap";
import styled from "styled-components";

const SingleJob = () => {
  const { id } = useParams(); // only need jobId, called 'id' in URL
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.user);
  const userId = userInfo?.id; // get userId from userInfo if available
  const { data, isLoading, error, refetch } = useGetSingleJobQuery(id);
  const { data: appliedStatus, isLoading: checkingApplied } =
    useCheckIfAppliedQuery({ userId, jobId: id }, { skip: !userId });

  const hasApplied = appliedStatus?.applied;
  const [resume, setResume] = useState(null);
  const [applyToJob, { isLoading: applying }] = useApplyToJobMutation();

  const handleApply = async () => {
    if (!resume) {
      alert("Please upload your resume before applying.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("userId", userInfo.id);
    formData.append("jobId", id);

    try {
      const res = await applyToJob(formData).unwrap();
      toast.success("Application submitted successfully!");

      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to apply for the job.");
    }
  };

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <p className="text-danger">Failed to load</p>;

  return (
    <Wrapper>
      <div className="container mt-4">
        <Row>
          <Col xs={12} className="mb-3">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              ← Back
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
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
            <p>
              <strong>Location:</strong> {data.job.location}
            </p>

            {userInfo?.role === "job-seeker" && (
              <div className="mt-3">
                <Form.Group controlId="resumeUpload">
                  <Form.Label>Upload Resume (PDF, Word)</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </Form.Group>

                <Button
                  variant="success"
                  className="mt-3"
                  onClick={handleApply}
                  disabled={hasApplied || applying}
                >
                  {checkingApplied
                    ? "Checking..."
                    : hasApplied
                    ? "Already Applied"
                    : applying
                    ? "Applying..."
                    : "Apply Now"}
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  h2 {
    color: var(--primary-600);
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
`;

export default SingleJob;
