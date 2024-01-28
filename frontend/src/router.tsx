import { FC } from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "@/layout";
import { CollectionPage } from "@/pages/CollectionPage";
import { EditCollectionPage } from "@/pages/EditCollectionPage";
import { EditItemPage } from "@/pages/EditItemPage";
import { HomePage } from "@/pages/HomePage";
import { ItemPage } from "@/pages/ItemPage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { SearchPage } from "@/pages/SearchPage";
import { SignupPage } from "@/pages/SignupPage";
import { UserPage } from "@/pages/UserPage";

export const ROUTES = {
  ROOT: "/",
  SEARCH: (querystring: string = "") => "/search" + querystring,
  LOGIN: "/login",
  SIGNUP: "/signup",
  USER: (id: number) => `/users/${id}`,
  COLLECTION: (id: number) => `/collections/${id}`,
  ITEM: (id: number) => `/items/${id}`,
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
    path: ROUTES.SEARCH(),
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
