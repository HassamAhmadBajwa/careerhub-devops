import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Components/index";
import { Link } from "react-router-dom";
const Navigationbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false); // Controls mobile menu
  const [showDropdown, setShowDropdown] = useState(false); // Profile dropdown toggle

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar
      expand="md"
      bg=""
      variant="dark"
      expanded={expanded}
      className="px-3"
      style={{ backgroundColor: "var(--primary-50)" }}
    >
      <Container fluid>
        {/* Left Side - Logo */}
        <Navbar.Brand href="/jobseeker/dashboard" className="fw-bold">
          <Logo />
        </Navbar.Brand>

        {/* Center Profile Dropdown (Only Visible on Medium Screens) */}
        <div className="d-md-none mx-auto">
          <NavDropdown
            title={
              <span className="text-white">
                <FaUserCircle className="me-1" /> Profile
              </span>
            }
            id="profile-dropdown"
            align="end"
            show={showDropdown}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </div>

        {/* Right Side - Toggle Button */}
        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
        >
          <FaBars className="text-white" />
        </Navbar.Toggle>

        {/* Navbar Items (Collapsible in Small Screens) */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto text-center">
            <Nav.Link
              href="/jobseeker/home"
              className=" fw-bold"
              onClick={() => setExpanded(false)}
              style={{ color: "var(--primary-600)" }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/jobseeker/about"
              className="fw-bold"
              style={{ color: "var(--primary-600)" }}
              onClick={() => setExpanded(false)}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/job-seeker/profile"
              className="fw-bold active"
              style={{ color: "var(--primary-600)" }}
              onClick={() => setExpanded(false)}
            >
              Profile
            </Nav.Link>
          </Nav>

          {/* Right Side - Profile Dropdown (Visible on Large Screens) */}
          <div className="d-none d-md-block">
            <NavDropdown
              title={
                <span
                  className="fw-bold"
                  style={{ color: "var(--primary-600)" }}
                >
                  <FaUserCircle className="me-1" /> Profile
                </span>
              }
              style={{ color: "var(--primary-600)" }}
              id="profile-dropdown"
              align="end"
              show={showDropdown}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <NavDropdown.Item
                onClick={handleLogout}
                style={{ color: "var(--primary-600)" }}
                className="fw-bold"
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
