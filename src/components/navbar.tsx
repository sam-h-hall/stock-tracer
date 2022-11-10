"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const navElements = [
    {
      displayName: "Home",
      endpoint: "/",
    },
    {
      displayName: "Explore",
      endpoint: "/explore",
    },
    {
      displayName: "Blah",
      endpoint: "/",
    },
    {
      displayName: "Blahh",
      endpoint: "/",
    },
    {
      displayName: "Blahhh",
      endpoint: "/",
    },
  ];

  return (
    <div className="flex h-20 flex-row items-center justify-between bg-blue-800 p-2 pl-7 pr-5 text-white">
      <h1 className="text-2xl">StockTracer</h1>
      <span className="flex-grow"></span>
      <div className="flex flex-grow justify-around">
        {navElements.map((el) => (
          <Link href={el.endpoint} key={el.displayName}>
            <span
              className={`${pathname === el.endpoint ? "underline" : null
                } hover:cursor-pointer`}
            >
              {el.displayName}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
