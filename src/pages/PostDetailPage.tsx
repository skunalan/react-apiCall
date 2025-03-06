import { Container, Row } from "react-bootstrap";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

interface PostDetailParams {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const postsLoader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const postDetail = await response.json();
  return postDetail;
};

function PostPage() {
  const postDetail = useLoaderData() as PostDetailParams;
  return (
  <>
    <Container>
      <Row>
          <p>{postDetail.body}</p> 
      </Row>
    </Container>
  </>
  );
}

export default PostPage;
