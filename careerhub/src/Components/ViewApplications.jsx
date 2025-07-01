import React from "react";
import {
  useGetViewApplicationsQuery,
  useUpdateViewApplicationStatusMutation,
} from "../redux/api/employerApi";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const ApplicationsList = () => {
  const { data, isLoading, isError } = useGetViewApplicationsQuery();
  const [updateStatus] = useUpdateViewApplicationStatusMutation();
  const navigate = useNavigate();

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await updateStatus({ appId, status: newStatus }).unwrap();
      toast.success("Application status updated");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) return <Spinner animation="border" />;
  if (isError) return <p className="text-danger">Error loading applications</p>;

  return (
    <div className="container mt-4">
      <h3 className="text-center fw-bold m-2 text-primary">
        Applications for Your Jobs
      </h3>
      <Button
        variant="dark"
        className="m-2"
        onClick={() => navigate("/employer/dashboard")}
      >
        ← Go Home
      </Button>
      <table className="table table-bordered table-hover mt-3">
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Location</th>

            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {data.applications.map((app) => (
            <tr key={app._id}>
              <td>{app.userId ? app.userId.fullname : "Unknown User"}</td>
              <td>{app.userId ? app.userId.email : "No Email"}</td>
              <td>{app.jobId ? app.jobId.title : "Unknown Job"}</td>
              <td>{app.jobId ? app.jobId.location : "Unknown Location"}</td>
              <td>{app.status}</td>
              <td>
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app._id, e.target.value)}
                  className="form-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsList;
