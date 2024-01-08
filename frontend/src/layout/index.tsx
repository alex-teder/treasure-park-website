import { ReactNode } from "react";
import { MainAppBar } from "./MainAppBar";
import { ScrollRestoration } from "react-router-dom";

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
