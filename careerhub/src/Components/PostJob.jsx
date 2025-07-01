import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  usePostJobMutation,
  useUpdateJobMutation,
  useGetEmployerJobsQuery,
} from "../redux/api/employerApi";
import { Form, Button, Spinner, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const PostJob = ({ isEdit = false, jobData = {} }) => {
  const { id } = useParams();
  const { data: jobsData } = useGetEmployerJobsQuery();

  // Initial state for job details
  const [jobDetails, setJobDetails] = useState({
    title: "",
    companyName: "",
    location: "",
    requirements: "",
    salaryRange: "",
    jobType: "",
    applicationDeadline: "",
    category: "",
  });

  const navigate = useNavigate();

  const [postJob, { isLoading }] = usePostJobMutation();
  const [updateJob, { isLoading: updating }] = useUpdateJobMutation();

  // If editing, populate the form with existing job data
  // This effect runs when the component mounts or when isEdit, id, or jobsData
  useEffect(() => {
    if (isEdit && id && jobsData?.jobs) {
      const foundJob = jobsData.jobs.find((job) => job._id === id);
      if (foundJob) {
        setJobDetails({
          title: foundJob.title || "",
          companyName: foundJob.companyName || "",
          location: foundJob.location || "",
          requirements: foundJob.requirements || "",
          salaryRange: foundJob.salaryRange || "",
          jobType: foundJob.jobType || "",
          category: foundJob.category || "",
          applicationDeadline:
            foundJob.applicationDeadline?.substring(0, 10) || "",
          description: foundJob.description || "",
        });
      }
    }
  }, [isEdit, id, jobsData]);

  // Handle form input changes
  // This function updates the jobDetails state with the input values
  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  // Handle form submission
  // This function either posts a new job or updates an existing job based on isEdit flag
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateJob({ jobId: id, updateData: jobDetails });
        toast.success("Job updated successfully!");
      } else {
        await postJob(jobDetails);
        toast.success("Job posted successfully!");
      }
      navigate("/employer/dashboard/myjobs");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to post job");
    }
  };
  return (
    <Container>
      <h2 className="mt-5 text-center text-primary fw-bold">
        Employer Dashboard
      </h2>

      <Button variant="dark" onClick={() => navigate(-1)} className="mb-3">
        ← Go back
      </Button>
      <Row className="">
        <h2 className="text-center mb-2 fw-bold">
          {isEdit ? "Edit Job" : "Post a New Job"}
        </h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="mt-2">Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={jobDetails.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2">Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={jobDetails.companyName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2">Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={jobDetails.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2">Requirements</Form.Label>
                <Form.Control
                  as="textarea"
                  name="requirements"
                  value={jobDetails.requirements}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2">Salary Range</Form.Label>
                <Form.Control
                  type="text"
                  name="salaryRange"
                  value={jobDetails.salaryRange}
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
                  value={jobDetails.jobType}
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
                  value={jobDetails.applicationDeadline}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2">Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={jobDetails.category}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                className="mt-3"
                disabled={isLoading || updating}
              >
                {isLoading || updating ? (
                  <Spinner size="sm" />
                ) : isEdit ? (
                  "Update Job"
                ) : (
                  "Post Job"
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default PostJob;
