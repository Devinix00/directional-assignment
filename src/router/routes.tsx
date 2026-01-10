import Layout from "../layouts/Layout";
import HomePage from "../pages/home/HomePage";
import PATH from "./path";
import LoginPage from "../pages/login/LoginPage";
import PostCreationPage from "../pages/post/creation/PostCreationPage";
import PostDetailPage from "../pages/post/detail/PostDetailPage";
import NotFoundPage from "../pages/notFound/NotFoundPage";

const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: PATH.HOME,
        element: <HomePage />,
      },
      {
        path: PATH.POST.CREATION,
        element: <PostCreationPage />,
      },
      {
        path: `${PATH.POST.ROOT}/:id`,
        element: <PostDetailPage />,
      },
      {
        path: PATH.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: PATH.LOGIN,
    element: <LoginPage />,
  },
];

export default routes;
