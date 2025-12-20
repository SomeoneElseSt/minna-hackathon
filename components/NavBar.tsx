'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavBar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="navbar">
      <Link className={clsx("navbtn", isActive("/") && "active")} href="/">Home</Link>
      <Link className={clsx("navbtn", isActive("/leaderboard") && "active")} href="/leaderboard">Leaderboard</Link>
      <Link className={clsx("navbtn", isActive("/settings") && "active")} href="/settings">Settings</Link>
    </nav>
  );
}
