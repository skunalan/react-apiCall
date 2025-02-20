import React from "react";
import { useLoaderData } from "react-router-dom";
import {Card, ListGroup} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

interface UserParams {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

export const usersLoader = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return users
};

function HomePage() {
  const users = useLoaderData() as UserParams[]

  return (
  <>
    {users.map((user) => (
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">User ID: {user.id}</Card.Subtitle>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>User Name: {user.username}</ListGroup.Item>
        <ListGroup.Item>User E-Mail: {user.email} </ListGroup.Item>
        <ListGroup.Item>City: {user.address.city} </ListGroup.Item>
      </ListGroup>
    </Card>
    ))}
  </>
  )
}

export default HomePage;
