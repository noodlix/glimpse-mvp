"use client";
import useScroll from "@/lib/hooks/use-scroll";
import { Bars2Icon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from "next/link";
import { useState } from "react";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";

export default function NavBar({ session }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const [menuopen, setMenuOpen] = useState(false)

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full ${scrolled
          ? "opacity-0.5"
          : `fixed top-0 w-full bg-[#E0AAFF] z-30 transition-all`
          } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">

        {session ? (
              <Bars2Icon className="h-4 w-4" onClick={() => { setMenuOpen(!menuopen)}} />
              ) : (
                <></>
             )}
              {menuopen ? ( <div className="relative inline-block">
                <div as="div" className="relative ml-3">
                    <div className="absolute right-60 z-10 mt-4 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" onClick={() => { setMenuOpen(!menuopen)}}>
                      <Link href="/guessing"> 
                        <div className="hover:bg-gray-100 flex-row relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-sm text-gray-700">
                          <ChevronRightIcon className="h-4 w-4"/><p className="text-sm">guessing</p>
                        </div>
                      </Link>
                      <Link href="/">
                        <div className="hover:bg-gray-100 flex-row relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-sm text-gray-700">
                          <ChevronRightIcon className="h-4 w-4"/><p className="text-sm">main</p>
                        </div>
                      </Link>
                    </div>
                </div>
              </div>
               ) : (<></>)
              } 
            
          <Link href="/" className="flex items-center font-display text-2xl"></Link>
          <div>
            {session ? (
              <UserDropdown session={session} setMenuOpen={setMenuOpen}/>
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
    </>
  );
}
