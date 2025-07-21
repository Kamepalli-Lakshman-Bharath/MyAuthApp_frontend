"use client";
import React from "react";
import { league_spartan, poppins } from "@/widgets/Fonts";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const path = usePathname();
  let isLogin = path === "/";
  let isRegister = path === "/register";
  const { push } = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    push("/");
  };

  return (
    <div className="h-[70px] flex items-center justify-between shadow px-4 lg:px-10">
      {/* title */}
      <div
        className={`capitalize text-[#FF8541] text-sm sm:text-lg lg:text-2xl font-semibold ${league_spartan.className}`}
      >
        my authentication app
      </div>
      {!isLogin && !isRegister ? (
        <div>
          <p
            onClick={handleLogout}
            className="text-xs cursor-pointer hover:text-[#FF8541] text-gray-600 sm:text-base font-medium"
          >
            Logout
          </p>
        </div>
      ) : (
        <div
          className={`${poppins.className} text-xs text-gray-600 sm:text-base font-medium `}
        >
          <Link
            href="/"
            className={`${isLogin ? "text-[#FF8541]" : ""} hover:underline`}
          >
            Login&nbsp;
          </Link>
          /
          <Link
            href="/register"
            className={`${isRegister ? "text-[#FF8541]" : ""} hover:underline`}
          >
            &nbsp;Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
