import { createBrowserRouter, RouteObject } from "react-router-dom";
import RootLayout from "./root";
import HomePage, { usersLoader } from "./pages/HomePage";
import UserPage, { userDetailLoader } from "./pages/UserPage";
import FavoritesPage from "./pages/FavoritesPage";
import PostDetailPage, { postsLoader } from "./pages/PostDetailPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <HomePage />,
        index: true,
        loader: usersLoader,
      },
      {
        path: "/users/:userId",
        element: <UserPage />,
        loader: userDetailLoader,
      },
      {
        path: "/users/:userId/posts/:postId",
        element: <PostDetailPage />,
        loader: postsLoader,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
