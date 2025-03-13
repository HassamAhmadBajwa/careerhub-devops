import React, { useState } from "react";
import {
  usePostJobMutation,
  useGetEmployerJobsQuery,
} from "../redux/api/employerApi";
import { Form, Button, Spinner, Container, Row, Col } from "react-bootstrap";

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    companyName: "",
    location: "",
    requirements: "",
    salaryRange: "",
    jobType: "",
    applicationDeadline: "",
    category: "",
  });
  const [postJob, { isLoading }] = usePostJobMutation();
  const { data: jobs, isLoading: loadingJobs } = useGetEmployerJobsQuery();

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postJob(jobData);
      alert("Job posted successfully!");
      setJobData({
        title: "",
        companyName: "",
        location: "",
        requirements: "",
        salaryRange: "",
        jobType: "",
        applicationDeadline: "",
        category: "",
      });
    } catch (error) {
      alert(error?.data?.message || "Failed to post job");
    }
  };
  return (
    <Container>
      <h2 className="mt-5 text-center fw-bold">Employer Dashboard</h2>
      <Row className="">
        <h4>Post a Job</h4>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="mt-2">Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2">Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={jobData.companyName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2">Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={jobData.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2">Requirements</Form.Label>
                <Form.Control
                  as="textarea"
                  name="requirements"
                  value={jobData.requirements}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2">Salary Range</Form.Label>
                <Form.Control
                  type="text"
                  name="salaryRange"
                  value={jobData.salaryRange}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="mt-2">Job Type</Form.Label>
                <Form.Select
                  name="jobType"
                  value={jobData.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2">Application Deadline</Form.Label>
                <Form.Control
                  type="date"
                  name="applicationDeadline"
                  value={jobData.applicationDeadline}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2">Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={jobData.category}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button type="submit" className="mt-3" disabled={isLoading}>
                {isLoading ? <Spinner size="sm" /> : "Post Job"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default PostJob;
