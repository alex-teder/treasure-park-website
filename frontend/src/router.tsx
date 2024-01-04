import { FC } from "react";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import Layout from "./layout";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";

export const ROUTES = {
  ROOT: "/",
  SEARCH: "/search",
  LOGIN: "/login",
  SIGNUP: "/signup",
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
  {
    path: ROUTES.LOGIN,
    element: applyLayout(LoginPage),
  },
  {
    path: ROUTES.SIGNUP,
    element: applyLayout(SignupPage),
  },
]);
