import Layout from "../layouts/Layout";
import HomePage from "../pages/home/HomePage";
import PATH from "./path";
import LoginPage from "../pages/login/LoginPage";
import PostCreationPage from "../pages/post/creation/PostCreationPage";

export const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: PATH.HOME,
        element: <HomePage />,
      },
      {
        path: PATH.POST_CREATION,
        element: <PostCreationPage />,
      },
    ],
  },
  {
    path: PATH.LOGIN,
    element: <LoginPage />,
  },
];
