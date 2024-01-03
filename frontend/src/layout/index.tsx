import { ReactNode } from "react";
import { MainAppBar } from "./MainAppBar";

function Layout({ children }: { children?: ReactNode | ReactNode[] }) {
  return (
    <>
      <MainAppBar />
      {children}
    </>
  );
}

export default Layout;
