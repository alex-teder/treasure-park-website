import { FC } from "react";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import Layout from "./layout";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { UserPage } from "./pages/UserPage";
import { CollectionPage } from "./pages/CollectionPage";
import { ItemPage } from "./pages/ItemPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { EditCollectionPage } from "./pages/EditCollectionPage";
import { EditItemPage } from "./pages/EditItemPage";

export const ROUTES = {
  ROOT: "/",
  SEARCH: "/search",
  LOGIN: "/login",
  SIGNUP: "/signup",
  USER: ({ id }: { id: number }) => `/users/${id}`,
  COLLECTION: ({ id }: { id: number }) => `/collections/${id}`,
  ITEM: ({ id }: { id: number }) => `/items/${id}`,
  EDIT_COLLECTION: "/edit-collection",
  EDIT_ITEM: "/edit-item",
};

const applyLayout = (Component: FC) => (
  <Layout>
    <Component />
  </Layout>
);

export const router = createBrowserRouter([
  {
    path: "*",
    element: applyLayout(NotFoundPage),
  },
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
  {
    path: "/users/:userId",
    element: applyLayout(UserPage),
  },
  {
    path: "/collections/:collectionId",
    element: applyLayout(CollectionPage),
  },
  {
    path: "/items/:itemId",
    element: applyLayout(ItemPage),
  },
  {
    path: ROUTES.EDIT_COLLECTION,
    element: applyLayout(EditCollectionPage),
  },
  {
    path: ROUTES.EDIT_ITEM,
    element: applyLayout(EditItemPage),
  },
]);
