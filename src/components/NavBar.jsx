import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import Logo2 from "../assets/images/logo/logo2.svg";
import "animate.css";

const navigation = [
  { name: "Home", to: "/", current: true },
  { name: "Treats", to: "/gallery", current: false },
  { name: "About", to: "/about", current: false },
  { name: "Contact", to: "/contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const location = useLocation();

  return (
    <Disclosure
      as="nav"
      className="bg-magicTeal w-full rounded-sm shadow-sm shadow-gray-500"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              {/* LEFT SECTION: Hamburger Menu for Mobile */}
              <DisclosureButton
                className="group sm:hidden inline-flex items-center justify-center 
<<<<<<< HEAD
             rounded-md p-2 text-black hover:bg-gray-800 hover:text-red-300 
             focus:outline-none"
=======
           w-10 h-10 rounded-md p-2 text-black  hover:text-magicPink 
           focus:outline-none"
>>>>>>> dd3b394 (added emoji to category titles of menu images.)
              >
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon
                    className="h-6 w-6 transition-transform duration-300
<<<<<<< HEAD
                 group-focus:animate-x-rotate"
                    aria-hidden="true"
                  />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
=======
               group-focus:animate-x-rotate fixed-position"
                    aria-hidden="true"
                  />
                ) : (
                  <Bars3Icon
                    className="h-6 w-6 fixed-position"
                    aria-hidden="true"
                  />
>>>>>>> dd3b394 (added emoji to category titles of menu images.)
                )}
              </DisclosureButton>
              {/* CENTER SECTION: Logo */}
              <div className="relative flex-1">
                <div className="flex justify-center items-center sm:hidden">
                  <img
                    src={Logo2}
                    alt="Magic Munchies"
                    className="h-24 w-auto mt-4 mr-12"
                  />
                </div>
              </div>

              {/* LEFT SECTION: Desktop Navigation Links */}
              <div className="hidden sm:flex sm:space-x-12 w-full justify-center">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      aria-current={isActive ? "page" : undefined}
                      className={classNames(
                        isActive
                          ? "bg-magicPeach text-black border border-magicTeal hover:border-black"
                          : "text-black hover:bg-magicPeach hover:text-white hover:border-black",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MOBILE MENU PANEL */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.to}
                    aria-current={isActive ? "page" : undefined}
                    className={classNames(
                      isActive
                        ? "bg-magicPeach text-black"
                        : "text-black hover:bg-magicPeach hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                );
              })}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
