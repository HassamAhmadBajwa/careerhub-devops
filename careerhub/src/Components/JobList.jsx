import React, { useState } from "react";
import { useGetAllJobsQuery } from "../redux/api/jobsApi";
import { Spinner, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const JobList = () => {
  const { data, isLoading, error } = useGetAllJobsQuery();
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <p className="text-danger">Failed to load</p>;

  const jobs = data?.jobs || [];
  console.log("Jobs Array:", jobs); // Debugging

  // Filter jobs based on user input
  const filteredJobs = jobs.filter((job) => {
    const categoryMatch =
      category === "" ||
      job.category.toLowerCase().includes(category.toLowerCase());

    const jobTypeMatch =
      jobType === "" ||
      job.jobType.toLowerCase().includes(jobType.toLowerCase());

    const locationMatch =
      location === "" ||
      job.location.toLowerCase().includes(location.toLowerCase());

    return categoryMatch && jobTypeMatch && locationMatch;
  });

  console.log("Filtered Jobs:", filteredJobs); // Debugging

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Jobs</h2>
      <Row>
        <Col md={4} className="mb-3">
          <Card className="p-3 shadow-sm">
            <h4 className="mb-3">Filter Jobs</h4>
            <Form.Group className="mb-3">
              <Form.Label>Search by Job Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="E.g., Software Engineer"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Type</Form.Label>
              <Form.Select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="">All</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city or region"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
          </Card>
        </Col>
        <Col md={8}>
          <Row>
            {filteredJobs.length === 0 ? (
              <p>No Jobs found with the selected fields</p>
            ) : (
              filteredJobs.map((job) => (
                <Col key={job._id} md={6} className="mb-3">
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title>{job.title}</Card.Title>
                      <Card.Text>
                        <strong>Company:</strong> {job.companyName} <br />
                        <strong>Requirements:</strong> {job.requirements} <br />
                        <strong>Salary:</strong> {job.salaryRange} <br />
                        <strong>Deadline:</strong>{" "}
                        {new Date(job.applicationDeadline).toLocaleDateString()}
                      </Card.Text>
                      <Link to={`/job-seeker/dashboard/job/${job._id}`}>
                        <Button variant="primary">View Job</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default JobList;
