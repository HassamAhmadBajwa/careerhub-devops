import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { authSuccess } from "../redux/slices/authSlice";
import { useRegisterMutation } from "../redux/api/authApi";

const Register = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
  });

  const res = useRegisterMutation();
  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input changes
  // This function updates the formData state when the user types in the input fields.
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Handle form submission
  // This function is called when the user submits the registration form.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData).unwrap();

      dispatch(authSuccess(response));
      navigate("/login");
      toast.success("Registration successful, please login");
    } catch (error) {
      if (error.response) {
        console.log("Error Response:", error.response);
        console.log("Error Status:", error.response.status);
        console.log("Error Data:", error.response.data);
        toast.error(error.response.data.message || "Registration failed");
      } else if (error.request) {
        console.log("No Response from Server:", error.request);
        toast.error("No response from server, please try again later");
      } else {
        console.log("Other Error:", error.message);
        toast.error(error.message || "An unexpected error occurred");
      }
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>Register</h3>
        {/* for username  */}
        <div className="form-group">
          <label htmlFor="username">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>
        {/* for emial */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* for password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* for phone number */}
        <div className="form-group">
          <label htmlFor="phone number">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        {/* for role */}
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={(e) => {
              setFormData({ ...formData, role: e.target.value });
            }}
            required
          >
            <option value="">Select</option>
            <option value="job-seeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        <button type="submit" disabled={isLoading} className="btn">
          {isLoading ? "Loading..." : "Register"}
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {error && (
          <p className="error-message">
            {error.data?.message || "Registration failed"}
          </p>
        )}
      </form>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f4f4f4;
  h3 {
    text-align: center;
    font-weight: bold;
    color: #007bff;
  }
  .form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .btn {
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn:hover {
    background: #0056b3;
  }

  p {
    margin-top: 10px;
    text-align: center;
  }

  a {
    color: #007bff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
