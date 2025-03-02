import { useLoaderData, Link } from "react-router-dom";
import { Card, Container, Row, ListGroup, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface UserParams {
  id: number;
  name: string;
  username: string;
}

export const usersLoader = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return users;
};

function HomePage() {
  const users = useLoaderData() as UserParams[];

  return (
    <>
      <Container className="mt-5">
        <Row className="g-2">
          {users.map((user) => (
            <Col key={user.id} className="d-flex align-items-center justify-content-center">
              <Card style={{ width: "20rem" }} className="shadow">
                <Card.Body>
                  <Card.Title>
                    <Link style={{textDecoration: "none"}} className="" to={`/users/${user.id}`}>
                    {user.name}
                    </Link>
                    </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>User Name: {user.username}</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
