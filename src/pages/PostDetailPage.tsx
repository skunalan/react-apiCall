import { Card, Container, Row } from "react-bootstrap";
import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";

interface PostDetailParams {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UserParams {
  id: number;
  name: string;
  username: string;
}

interface CommentParams {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const postsLoader = async ({ params }: LoaderFunctionArgs) => {
  const postResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const postDetail = await postResponse.json();

  const commentResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`
  );
  const comments = await commentResponse.json();

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u: UserParams) => u.id === postDetail.userId)
  console.log("Comments:", comments);

  return { postDetail,user, comments };
  
};

function PostPage() {
  const {postDetail, user, comments} = useLoaderData() as {postDetail: PostDetailParams, user: UserParams, comments: CommentParams[]};

  if (!postDetail || !comments) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container className="mt-3">
        <Row>
          <h3>User Name:
            <Link className="text-decoration-none" to={`/users/${user.id}`}>
            {user.username}
            </Link>
            </h3>
          <Card className="mt-3 shadow">
            <h3>Title</h3>
            <Card.Header>{postDetail.title}</Card.Header>
            <Card.Body>
              <h4>Detail</h4>
              <Card.Title>{postDetail.body}</Card.Title>
            </Card.Body>
          </Card>
          <h3 className="mb-3 mt-3">Comments</h3>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <h5>{comment.name}</h5>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>

        </Row>
      </Container>
    </>
  );
}

export default PostPage;
