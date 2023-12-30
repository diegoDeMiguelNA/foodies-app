import logoImage from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

import MainHeaderBackground from "./main-header-background";
import classes from "./main-header.module.css";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image priority src={logoImage} alt="a plate with food on it" />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href={"/meals"}>Meals</NavLink>
            </li>
            <li>
              <NavLink href={"/community"}>Foodies community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
