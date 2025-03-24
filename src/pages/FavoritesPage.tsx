import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useStore } from "../store/store";
import { Link } from "react-router-dom";

function FavoritesPage() {
  const { favPhotos, favPosts, removeFavoritePhoto, removeFavoritePost } = useStore();

  return (
    <>
      <Container className="mt-5">
        <h2 className="text-center">Favorite Photos</h2>
        <Row className="g-2 justify-content-center mt-3">
          {favPhotos.map((photo) => (
            <Col key={photo.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="d-flex align-items-center justify-content-center shadow"
                style={{ width: "100%" }}
              >
                <Card.Img variant="top" src={photo.thumbnailUrl} />
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <Card.Title>{photo.title}</Card.Title>
                  <Card.Text className="text-muted">
                    User:{" "}
                    <Link className="text-decoration-none" to={`/users/${photo.userId}`}> {photo.userId}</Link>
                  </Card.Text>
                  <Button
                  className="mt-3"
                    variant="danger"
                    onClick={() => removeFavoritePhoto(photo.id)}
                  >
                    Remove from Favorites
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <h2 className="mt-5 text-center">Favorite Posts</h2>
        <Row className="g-2 justify-content-center mt-3">
          {favPosts.map((post) => (
            <Col key={post.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="d-flex align-items-center justify-content-center shadow"
                style={{ width: "100%" }}
              >
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <Card.Title>
                    <Link className="text-decoration-none" to={`/users/${post.userId}/posts/${post.id}`}>
                      {post.title}
                    </Link>
                  </Card.Title>
                  <Button
                  className="mt-3"
                    variant="danger"
                    onClick={() => removeFavoritePost(post.id)}
                  >
                    Remove from Favorites
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default FavoritesPage;
