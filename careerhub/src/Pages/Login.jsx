import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/api/authApi";

import {
  authStart,
  authSuccess,
  authFailure,
  logout,
} from "../redux/slices/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(authStart());
    try {
      const response = await login(formData).unwrap();

      const { user, token, role } = response;
      dispatch(authSuccess({ user, token, role }));

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "employer") {
        navigate("/employer/dashboard");
      } else if (role === "job-seeker") {
        navigate("/job-seeker/dashboard");
      }
    } catch (error) {
      console.log("Login Error:", error);
      dispatch(authFailure(error.data?.message || "Login failded"));
    }
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>Login</h3>
        {/* for emial */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id=""
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
            id=""
            value={formData.password}
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
            onChange={handleChange}
            required
          >
            <option value="job-seeker">Job Seeker</option>
            <option value="employer">Employer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;

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
