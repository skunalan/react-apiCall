import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useStore } from "../store/store";
import { Link } from "react-router-dom";

function FavoritesPage() {
  const { favPhotos, removeFavorite } = useStore();

  return (
    <>
      <Container className="mt-5">
        <h2>Favorites</h2>
        <Row className="g-2 justify-content-center mt-3">
          {favPhotos.map((photo) => (
            <Col key={photo.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="d-flex align-items-center justify-content-center shadow"
                style={{ width: "100%" }}
              >
                <Card.Img variant="top" src={photo.thumbnailUrl} />
                <Card.Body>
                  <Card.Title>{photo.title}</Card.Title>
                  <Card.Text>
                    User:{" "}
                    <Link to={`/users/${photo.userId}`}> {photo.userId}</Link>
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => removeFavorite(photo.id)}
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
