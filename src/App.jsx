import "./Components/App.css";
import Albums, { loader as albumsLoader } from "./Components/routers/Albums";
import Album, { loader as albumLoader } from "./Components/routers/Album";
import Users, { loader as usersLoader } from "./Components/routers/Users";
import User, { loader as userLoader } from "./Components/routers/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/routers/Layout";
import Eror from "./Components/routers/Mistake";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/albums",
        loader: albumsLoader,
        element: <Albums />,
      },
      {
        path: "/users",
        loader: usersLoader,
        element: <Users />,
      },
      {
        path: "/users/:id",
        loader: userLoader,
        element: <User />,
      },
      {
        path: "/album/:id",
        loader: albumLoader,
        element: <Album />,
      },
    ],
    errorElement: <Eror />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
