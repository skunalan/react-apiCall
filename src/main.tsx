import ReactDom from "react-dom/client";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
