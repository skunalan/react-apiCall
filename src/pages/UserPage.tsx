import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Card, Col, Container, ListGroup, Nav, Row } from "react-bootstrap";
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

interface AlbumParams {
  userId: number;
  id: number;
  title: string;
}

interface TodoParams {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const userDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );
  const userDetail = await response.json();
  return userDetail;
};

function UserPage() {
  const userDetail = useLoaderData() as UserDetailParams;
  const [posts, setPosts] = useState<PostParams[]>([]);
  const [albums, setAlbums] = useState<AlbumParams[]>([]);
  const [todos, setTodos] = useState<TodoParams[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

  const fetchData = async () => {
    try {
      const [postsResponse, albumsResponse, todosResponse] = await Promise.all([
        fetch(
          `https://jsonplaceholder.typicode.com/users/${userDetail.id}/posts`
        ),
        fetch(
          `https://jsonplaceholder.typicode.com/users/${userDetail.id}/albums`
        ),
        fetch(
          `https://jsonplaceholder.typicode.com/users/${userDetail.id}/todos`
        ),
      ]);
      const postsData = await postsResponse.json();
      const albumsData = await albumsResponse.json();
      const todosData = await todosResponse.json();
      setPosts(postsData);
      setAlbums(albumsData);
      setTodos(todosData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    if (activeTab) {
      fetchData();
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
                <Nav
                  variant="tabs"
                  activeKey={activeTab}
                  onSelect={(selectedKey) => setActiveTab(selectedKey || "")}
                >
                  <Nav.Item>
                    <Nav.Link className="me-5" eventKey="posts">
                      Post
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="me-5" eventKey="albums">
                      Album
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="todos">ToDo</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
              {activeTab === "posts" && posts && (
                <Card.Body>
                  <ListGroup>
                    {posts.map((post) => (
                      <ListGroup.Item
                        as={Link}
                        to={`/users/${userDetail.id}/posts/${post.id}`}
                        key={post.id}
                      >
                        <h5 className="text-info">
                          {post.title}
                        </h5>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              )}
              {activeTab === "albums" && albums && (
                <Card.Body>
                  <ListGroup>
                    {albums.map((album) => (
                      <ListGroup.Item
                        as={Link}
                        to={`/users/${userDetail.id}/albums/${album.id}`}
                        key={album.id}
                      >
                        <h5 className="text-warning">{album.title}</h5>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              )}
              {activeTab === "todos" && todos && (
                <Card.Body>
                  <ListGroup>
                    {todos.map((todo) => (
                      <ListGroup.Item key={todo.id}>
                        <h5 className="text-danger">{todo.title}</h5>
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
