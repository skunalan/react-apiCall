import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  ListGroup,
  Nav,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";

interface UserDetailParams {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface PostParams {
  id: number;
  title: string;
  body: string;
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
  const [posts, setPosts] = useState<PostParams[] | null>(null);
  const [activeTab, setActiveTab] = useState<string>("");

  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userDetail.id}/posts`)
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (activeTab === "posts" && posts === null) {
      fetchPosts();
    }
  }, [activeTab]);
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col className="d-flex align-items-center justify-content-center text-center">
            <Card style={{ width: "100%" }} className="shadow">
              <Card.Body className="fs-2">
                <Card.Title>
                  <h1>{userDetail.name}</h1>
                </Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item className="text-muted">
                    Username: {userDetail.username}
                  </ListGroup.Item>
                  <ListGroup.Item>Email: {userDetail.email}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Body className="mt-3 d-flex align-items-center justify-content-center">
                <Nav variant="tabs"
                  activeKey={activeTab}
                  onSelect={(selectedKey) => setActiveTab(selectedKey || "")}>
                  <Nav.Item>
                    <Nav.Link  className="me-5" eventKey="posts">
                      Active
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="me-5" eventKey="link-2">
                      Option 2
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-3">Disabled</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
              {activeTab === "posts" && posts && (
                <Card.Body>
                  <ListGroup>
                    {posts.map((post) => (
                      <ListGroup.Item key={post.id}>
                        <h5>{post.title}</h5>
                        <p>{post.body}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserPage;
