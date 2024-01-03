import { FC } from "react";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import Layout from "./layout";

export const ROUTES = {
  ROOT: "/",
  SEARCH: "/search",
};

const applyLayout = (Component: FC) => (
  <Layout>
    <Component />
  </Layout>
);

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: applyLayout(HomePage),
  },
  {
    path: ROUTES.SEARCH,
    element: applyLayout(SearchPage),
  },
]);
