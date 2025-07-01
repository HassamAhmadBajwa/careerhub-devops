import React from "react";
import { useSelector } from "react-redux";
import { useGetUserApplicationsQuery } from "../redux/api/applicationJobsApi";
import { Card, Spinner, Row, Col } from "react-bootstrap";

const AppliedJobs = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  // Fetch applied jobs using the userId
  // The useGetUserApplicationsQuery hook is used to fetch the applications
  const {
    data: applications,
    isLoading,
    error,
  } = useGetUserApplicationsQuery(userId, {
    skip: !userId,
  });

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <p className="text-danger">Error loading applied jobs.</p>;

  return (
    <div className="container mt-4">
      <h2>Applied Jobs</h2>
      <Row>
        {Array.isArray(applications) && applications.length > 0 ? (
          applications.map((app) => (
            <Col md={6} key={app._id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{app.jobId.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {app.jobId.companyName}
                  </Card.Subtitle>
                  <p>
                    <strong>Location:</strong> {app.jobId.location}
                  </p>
                  <p>
                    <strong>Status:</strong> {app.status || "Pending"}
                  </p>
                  <p>
                    <strong>Applied On:</strong>{" "}
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="mt-3">You haven't applied to any jobs yet.</p>
        )}
      </Row>
    </div>
  );
};

export default AppliedJobs;
