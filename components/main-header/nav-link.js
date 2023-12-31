"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";

export default function NavLink({ href, children }) {
  const path = usePathname();
  console.log(path);
  console.log(href);
  console.log(path.startsWith(href) ? classes.active : undefined);
  return (
    <Link
      className={path.startsWith(href) ? classes.active : undefined}
      href={href}
    >
      {children}
    </Link>
  );
}
