import { ReactNode } from "react";
import { ScrollRestoration } from "react-router-dom";

import { MainAppBar } from "./MainAppBar";

function Layout({ children }: { children?: ReactNode | ReactNode[] }) {
  return (
    <>
      <MainAppBar />
      {children}
      <ScrollRestoration />
    </>
  );
}

export default Layout;
