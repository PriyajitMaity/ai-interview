import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

const RootLayout = ({children}: {children: ReactNode}) => {
  return <div className="root-layout">
    <nav className="">
      <Link href={'/'} className="flex items-center gap-2">
        <Image src="logo.svg" alt="prep talk logo" height={32} width={38}/>
        <h2 className="text-primary-100">Prep Talk</h2>
      </Link>
    </nav>
    {children}
    </div>;
};

export default RootLayout;
