import { createBrowserRouter, RouteObject } from "react-router-dom";
import RootLayout from "./root";
import HomePage, { usersLoader } from "./pages/HomePage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        element: <HomePage/>,
        index: true,
        loader: usersLoader
      }
    ]
  },
];

const router = createBrowserRouter(routes);

export default router;
