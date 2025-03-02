import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

interface UserDetailParams {
  id: number;
  name: string;
  username: string;
  email: string;
}
export const userDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );
  const userDetail = response.json();
  return userDetail;
};

function UserPage() {
  const userDetail = useLoaderData() as UserDetailParams;
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col className="d-flex align-items-center justify-content-center text-center">
            <Card style={{ width: "30rem" }} className="shadow">
              <Card.Body className="fs-2">
                <Card.Title> <h1>{userDetail.name}</h1> </Card.Title>
                <Card.Text>Username: {userDetail.username}</Card.Text>
                Email: {userDetail.email}
                <Button className="mt-3 btn-lg" variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserPage;
