import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetEmployerJobsQuery } from "../redux/api/jobsApi";
import { useDeleteJobMutation } from "../redux/api/employerApi";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const { data, isLoading, isError, error } = useGetEmployerJobsQuery();
  const [deleteJob] = useDeleteJobMutation();
  const navigate = useNavigate();

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(jobId).unwrap();
        toast.success("Job deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || "Failed to delete job");
      }
    }
  };
  return (
    <>
      <Container className="my-5">
        <Button
          variant="dark"
          className="mb-2"
          onClick={() => navigate("/employer/dashboard")}
        >
          ← Go Home
        </Button>
        <h2 className="text-center mb-4 text-primary fw-bold">
          My Posted Jobs
        </h2>

        {isLoading && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {isError && (
          <Alert variant="danger">
            {error?.data?.message || "Something went wrong"}
          </Alert>
        )}

        {data?.jobs?.length === 0 && !isLoading && (
          <Alert variant="info" className="text-center">
            You haven’t posted any jobs yet.
          </Alert>
        )}

        <Row className="g-4">
          {data?.jobs?.map((job) => (
            <Col key={job._id} xs={12} md={6} lg={4}>
              <Card className="shadow-sm rounded-4 h-100">
                <Card.Body>
                  <Card.Title className="fw-bold text-capitalize text-primary">
                    {job.title}
                  </Card.Title>
                  <Card.Text>
                    <strong>Company:</strong> {job.companyName} <br />
                    <strong>Location:</strong> {job.location} <br />
                    <strong>Type:</strong> {job.jobType} <br />
                    <strong>Category:</strong> {job.category} <br />
                    <strong>Deadline:</strong>{" "}
                    {new Date(job.applicationDeadline).toLocaleDateString()}{" "}
                    <br />
                    <strong>Status:</strong> <Badge bg="success">Open</Badge>
                  </Card.Text>
                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() =>
                        navigate(`/employer/dashboard/update-job/${job._id}`)
                      }
                    >
                      Edit
                    </Button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteJob(job._id)}
                      disabled={isLoading}
                    >
                      {isLoading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default MyJobs;
