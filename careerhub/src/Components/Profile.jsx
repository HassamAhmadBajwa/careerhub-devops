import React, { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../redux/api/profileApi";
import { useDispatch, useSelector } from "react-redux";
import {
  profileStart,
  profileSuccess,
  profileFailure,
  updateProfileSuccess,
  clearProfile,
} from "../redux/slices/profileSlice";
import { Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.profile);

  // Fetch profile data
  const { data, error, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    location: "",
    education: "",
    experience: "",
    resume: null,
  });
  // Load profile data when fetched
  useEffect(() => {
    if (data?.user) {
      setProfileData({
        name: data.user.username || "",
        email: data.user.email || "",
        phoneNumber: data.user.phoneNumber || "",
        location: data.user.profile?.location || "",
        education: data.user.profile?.education || "",
        experience: data.user.profile?.experience || "",
        resume: data.user.profile?.resume || null,
      });

      dispatch(profileSuccess(data.user));
    }
  }, [data, dispatch]);
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Handle resume file upload
  const handleFileChange = (e) => {
    setProfileData({ ...profileData, resume: e.target.files[0] });
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", profileData.username);
    formData.append("email", profileData.email);
    formData.append("phoneNumber", profileData.phoneNumber);
    formData.append("location", profileData.location);
    formData.append("education", profileData.education);
    formData.append("experience", profileData.experience);
    if (profileData.resume) {
      formData.append("resume", profileData.resume); // Append resume file
    }

    try {
      const updatedProfile = await updateProfile(formData).unwrap();
      dispatch(updateProfileSuccess(updatedProfile.user));
      alert("Profile updated successfully!");
    } catch (err) {
      dispatch(profileFailure(err?.data?.message || "Update failed"));
      alert("Failed to update profile");
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Job Seeker Profile</h2>

          {isLoading ? (
            <Spinner animation="border" />
          ) : error ? (
            <p className="text-danger">
              {error.data?.message || "Failed to load profile"}
            </p>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={profileData.username}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={profileData.email}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Education</Form.Label>
                <Form.Control
                  type="text"
                  name="education"
                  value={profileData.education}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Experience</Form.Label>
                <Form.Control
                  type="text"
                  name="experience"
                  value={profileData.experience}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Resume</Form.Label>
                <Form.Control
                  type="file"
                  name="resume"
                  onChange={handleFileChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Save Profile"}
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
