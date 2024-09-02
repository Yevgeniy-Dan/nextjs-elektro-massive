"use client";

import React from "react";

import CategoryMenu from "../menu/CategoryMenu";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserActions from "./UserActions";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div className="bg-gradient-elektro-massive-horizontal  rounded-r-3xl  pl-4 sm:pl-8 md:pl-12 lg:pl-16 pr-2 -ml-6 md:-ml-16">
      <header className="mt-2 font-medium">
        <div className="flex flex-row md:flex-col lg:flex-row justify-between items-center w-full">
          <div className="flex items-center w-1/2 sm:2/3 md:w-auto">
            <Logo />
          </div>
          <NavLinks />
          <UserActions />
        </div>
      </header>
      <nav className="flex flex-row  justify-start items-center w-full pb-3 gap-2 max-w-7xl mx-auto  ">
        <CategoryMenu />

        <SearchBar />
      </nav>
    </div>
  );
};

export default Header;
