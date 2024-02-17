import React from "react";
import { ReactComponent as Logo } from "./assets/unilectives.svg";
import { ReactComponent as BookOpen } from "./assets/book_open.svg";
import { ReactComponent as ShieldCheck } from "./assets/shield_check.svg";
import { ReactComponent as Moon } from "./assets/moon.svg";
import { ReactComponent as UserCircle } from "./assets/user_circle.svg";
import { ReactComponent as BarArrow } from "./assets/bar_arrow.svg";
import { ReactComponent as ArrowRectangle } from "./assets/arrow_rectangle.svg";

function Navbar() {
  return (
    <>
      <nav className="flex flex-col items-center left-0 w-20 h-full fixed bg-[#f9fafb] ">
        <div className="flex flex-col space-y-8 items-center">
          {/* Top Icons */}
          <Logo className="h-15 w-15 pl-2 pt-4"></Logo>
          <div className="h-0.5 w-3/4 bg-[#e5e7eb]"></div>
          <BookOpen className="h-6 w-6"></BookOpen>
          <ShieldCheck className="h-6 w-6"></ShieldCheck>

          {/* Separate Div For the bottom icons */}
          <div className="absolute bottom-0 space-y-8 items-center pb-10">
            <BarArrow className="h-6 w-6"></BarArrow>
            <UserCircle className="h-6 w-6"></UserCircle>
            <Moon className="h-6 w-6"></Moon>
            <ArrowRectangle className="h-6 w-6"></ArrowRectangle>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
