"use client";

import React from "react";

import CategoryMenu from "../menu/CategoryMenu";
import NavLinks from "./NavLinks";
import UserActions from "./UserActions";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";

interface HeaderProps {
  lng: string;
}

const Logo = dynamic(() => import("./Logo"), {
  ssr: false,
  loading: () => <div className="w-48 h-16 md:w-64 md:h-24 bg-transparent" />,
});

const Header: React.FC<HeaderProps> = ({ lng }) => {
  return (
    <div className="bg-gradient-elektro-massive-horizontal  rounded-r-3xl  pl-4 sm:pl-8 md:pl-12 lg:pl-16 pr-2 -ml-6 md:-ml-16  text-sm">
      <header className="mt-2 font-medium">
        <div className="flex flex-row md:flex-col lg:flex-row justify-between items-center w-full">
          <div className="flex items-center w-1/2 sm:2/3 md:w-auto">
            <Logo lng={lng} />
          </div>
          <NavLinks lng={lng} />
          <div className="flex items-center shrink-0">
            <UserActions lng={lng} />
          </div>
        </div>
      </header>
      <nav className="flex flex-row  justify-start items-center w-full pb-3 gap-2 max-w-7xl mx-auto">
        <div className="flex flex-row justify-start items-center gap-2 w-full">
          <CategoryMenu lng={lng} />

          <SearchBar lng={lng} />
        </div>
      </nav>
    </div>
  );
};

export default Header;
