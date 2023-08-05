"use client";
import useScroll from "@/lib/hooks/use-scroll";
import { Bars2Icon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";

export default function NavBar({ session }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const [menuopen, setMenuOpen] = useState(false);

  const showroutes = () => {
    setMenuOpen(true);
    setTimeout(() => {
      setMenuOpen(false);
    }, 2000);
  };

  const hideroutes = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 400);
  };
  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-screen ${
          scrolled
            ? "opacity-0.5"
            : `fixed top-0 z-30 w-screen bg-[#E0AAFF] transition-all`
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <div className="flex h-full flex-row gap-4">
            {session ? (
              <Bars2Icon
                className="mt-5 h-4 w-4"
                onMouseEnter={() => showroutes()}
              />
            ) : (
              <></>
            )}
            {/* <div onClick={sendTheme}>
              {light ? (
                <SunIcon className="mt-4 h-6 w-4" />
              ) : (
                <MoonIcon className="mt-5 h-4 w-4" />
              )}
            </div> */}
          </div>
          <Link
            href="/"
            className="flex items-center font-display text-2xl"
          ></Link>
          <div>
            {session ? (
              <UserDropdown session={session} setMenuOpen={setMenuOpen} />
            ) : (
              <button
                className="rounded-full border border-black  bg-[#10002B] p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {menuopen ? (
        <div
          className="absolute right-0 z-30 mt-14 w-11/12"
          onMouseLeave={() => hideroutes()}
        >
          <div
            className="w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            onClick={() => {
              setMenuOpen(!menuopen);
            }}
          >
            <Link href="/library">
              <div className="relative flex w-full flex-row items-center justify-start space-x-2 rounded-md p-2 text-sm text-gray-700 hover:bg-gray-100">
                <ChevronRightIcon className="h-4 w-4" />
                <p className="text-sm">library</p>
              </div>
            </Link>
            <Link href="/">
              <div className="relative flex w-full flex-row items-center justify-start space-x-2 rounded-md p-2 text-sm text-gray-700 hover:bg-gray-100">
                <ChevronRightIcon className="h-4 w-4" />
                <p className="text-sm">main</p>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
