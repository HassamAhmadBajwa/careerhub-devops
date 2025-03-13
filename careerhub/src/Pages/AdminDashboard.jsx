import React from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
  useDeleteJobMutation,
  useUpdateJobStatusMutation,
  useGetJobsQuery,
} from "../redux/api/adminApi";
import { Navigationbar } from "../Components/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // fetch all users
  const {
    data: users,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useGetUsersQuery();
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  const {
    data: jobs,
    isLoading: jobsLoading,
    refetch: refetchJobs,
  } = useGetJobsQuery();
  const [moderateJob] = useUpdateJobStatusMutation();
  const [deleteJob] = useDeleteJobMutation();

  //handle user activate/ suspension
  const handleUserStatus = async (id, isActive) => {
    try {
      await updateUserStatus({ id, isActive: !isActive });
      toast.success("User status updated");
      refetchUsers();
    } catch (error) {
      toast.error("Error Updating user Status");
    }
  };
  //handle user deletion
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      toast.success("User deleted Successfully");
      refetchUsers();
    } catch (error) {
      toast.error("Error Deleting User");
    }
  };

  // handle update Job Status
  const handleJobStatus = async (id, status) => {
    try {
      await moderateJob({ id, status });
      toast.success("Job status updated");
      refetchJobs();
    } catch (error) {
      toast.error("Error updating Job Status");
    }
  };

  // handle job deleting
  const handleDeleteJob = async (id) => {
    try {
      await deleteJob(id);
      toast.success("Job deleted Successfully");
      refetchJobs();
    } catch (error) {
      toast.error("Error deleting Job");
    }
  };
  // logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Navigationbar />
      <Container className="mt-4">
        <h2 className="text-center">Admin Dashboard</h2>

        {/* User Management */}
        <h3 className="mt-4">Manage Users</h3>
        {usersLoading ? (
          <Spinner animation="border" />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.users?.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isActive ? "Active" : "Suspended"}</td>
                  <td>
                    <Button
                      variant={user.isActive ? "warning" : "success"}
                      onClick={() => handleUserStatus(user._id, user.isActive)}
                    >
                      {user.isActive ? "Suspend" : "Activate"}
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteUser(user._id)}
                      className="ms-2"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Job Moderation */}
        <h3 className="mt-4">Moderate Jobs</h3>
        {jobsLoading ? (
          <Spinner animation="border" />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs?.jobs?.map((job) => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.companyName}</td>
                  <td>{job.status}</td>
                  <td>
                    {job.status !== "Approved" && (
                      <Button
                        variant="success"
                        onClick={() => handleJobStatus(job._id, "Approved")}
                      >
                        Approve
                      </Button>
                    )}
                    {job.status !== "Rejected" && (
                      <Button
                        variant="warning"
                        onClick={() => handleJobStatus(job._id, "Rejected")}
                        className="ms-2"
                      >
                        Reject
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteJob(job._id)}
                      className="ms-2"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default AdminDashboard;
