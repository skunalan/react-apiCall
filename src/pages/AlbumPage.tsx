import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";

interface AlbumParams {
  userId: number;
  id: number;
  title: string;
}

interface PhotoParams {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface UserParams {
  id: number;
  name: string;
  username: string;
}

export const albumLoader = async ({ params }: LoaderFunctionArgs) => {
  const albumResponse = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${params.albumId}`
  );
  const albumData = await albumResponse.json();

  const photoResponse = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${params.albumId}/photos`
  );
  const photoData = await photoResponse.json();

  return { albumData, photoData };
};
function AlbumPage() {
  const { albumData, photoData } = useLoaderData() as {
    albumData: AlbumParams;
    photoData: PhotoParams[];
  };

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u: UserParams) => u.id === albumData.userId);

  return (
    <>
      <Container className="mt-5">
        <Row>
          <h3>
            User Name:
            <Link className="text-decoration-none" to={`/users/${user.id}`}>
              {user.username}
            </Link>
          </h3>
          {<h4 className="mt-2">{albumData.title}</h4>}
        </Row>
        <Row className="g-2 justify-content-center mt-3">
          {photoData.map((photo) => (
            <Col key={photo.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="d-flex align-items-center justify-content-center shadow" style={{ width: "100%" }}>
              <Card.Img variant="top" src={photo.url} />
              <Card.Body>
                <Card.Title>{photo.title}</Card.Title>
              </Card.Body>
              <Card.Body>
                <Button variant="outline-danger">Add to Favorites</Button>
              </Card.Body>
            </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default AlbumPage;
