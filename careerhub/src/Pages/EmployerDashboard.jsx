import { Navigationbar, DashboardCard } from "../Components";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navigationbar />
      <Container className="my-5">
        <h2 className="text-center mb-4 fw-bold">Employer Dashboard</h2>
        <Row className="g-4 justify-content-center">
          <Col xs={12} sm={10} md={6} lg={4}>
            <DashboardCard
              title="Create Jobs"
              description="Create a new job listing and find the right candidate."
              buttonText="Create Job"
              onClick={() => navigate("/employer/dashboard/createjob")}
            />
          </Col>
          <Col xs={12} sm={10} md={6} lg={4}>
            <DashboardCard
              title="My Jobs"
              description="View and manage the jobs you have posted."
              buttonText="View Posted Jobs"
              onClick={() => navigate("/employer/dashboard/myjobs")}
            />
          </Col>
          <Col xs={12} sm={10} md={6} lg={4}>
            <DashboardCard
              title="View Applications"
              description="See the applications submitted for your jobs."
              buttonText="View Applications"
              onClick={() => navigate("/employer/dashboard/applications")}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EmployerDashboard;
