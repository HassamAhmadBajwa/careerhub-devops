// src/components/DashboardCard.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";

const DashboardCard = ({ title, description, buttonText, onClick }) => {
  return (
    <Card className="shadow-sm rounded-4 p-3 ">
      <Card.Body>
        <Card.Title className="fs-4 fw-normal">{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" onClick={onClick}>
          {`-> ${buttonText}`}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DashboardCard;
