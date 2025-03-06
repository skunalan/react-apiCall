import { createBrowserRouter, RouteObject } from "react-router-dom";
import RootLayout from "./root";
import HomePage, { usersLoader } from "./pages/HomePage";
import UserPage, { userDetailLoader } from "./pages/UserPage";
import FavoritesPage from "./pages/FavoritesPage";



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
        path: "/favorites",
        element: <FavoritesPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
