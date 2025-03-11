"use client";

import React from "react";

import CategoryMenu from "../menu/CategoryMenu";
import NavLinks from "./NavLinks";
import UserActions from "./UserActions";
import SearchBar from "./SearchBar";
import Logo from "./Logo";

interface HeaderProps {
  lng: string;
}

const Header: React.FC<HeaderProps> = ({ lng }) => {
  return (
    <div className="bg-gradient-elektro-massive-horizontal  rounded-r-3xl  pl-4 sm:pl-8 md:pl-12 lg:pl-16 pr-2 -ml-6 md:-ml-16  text-sm">
      <header className="mt-2 font-medium">
        <div className="flex flex-row md:flex-col xl:flex-row justify-between items-center w-full min-h-[60px] md:min-h-[120px] xl:min-h-[80px]">
          <div className="flex items-center w-1/2 sm:2/3 md:w-auto h-16 md:h-24">
            <Logo lng={lng} />
          </div>
          <div className="h-[40px] md:h-[40px] md:mb-6 xl:mb-0">
            <NavLinks lng={lng} />
          </div>
          <div className="flex items-center shrink-0">
            <UserActions lng={lng} />
          </div>
        </div>
      </header>
      <nav className="flex flex-row  justify-start items-center w-full pb-3 gap-2 max-w-7xl mx-auto min-h-[50px] md:mt-2 xl:mt-0">
        <div className="flex flex-row justify-start items-center gap-2 w-full">
          <CategoryMenu lng={lng} />
          <SearchBar lng={lng} />
        </div>
      </nav>
    </div>
  );
};

export default Header;
