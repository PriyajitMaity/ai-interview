import React, { ReactNode } from "react";

const RootLayout = ({children}: {children: ReactNode}) => {
  return <div className="pattern">{children}</div>;
};

export default RootLayout;
