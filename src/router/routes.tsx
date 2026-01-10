import Layout from "../layouts/Layout";
import HomePage from "../pages/home/HomePage";
import PATH from "./path";

export const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: PATH.HOME,
        element: <HomePage />,
      },
    ],
  },
];
