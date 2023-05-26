import React, { Fragment } from "react";
import Navigation from "./navigation";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Fragment>
      <Navigation />
      <main className="bg-background min-h-screen px-6 lg:px-24 main">
        {children}
      </main>
    </Fragment>
  );
};

export default Layout;
