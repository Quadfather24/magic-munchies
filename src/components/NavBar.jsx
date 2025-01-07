import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo/vertical-logo.png";

const navigation = [
  { name: "Home", to: "/", current: true },
  { name: "Menu", to: "/gallery", current: false },
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
      className="bg-magicPink w-full rounded-sm border-none shadow-sm shadow-gray-500"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* LEFT SECTION: Hamburger Menu for Mobile */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton
              className="inline-flex items-center justify-center rounded-md p-2 text-black 
                         hover:bg-gray-800 hover:text-red-300 focus:outline-none 
                         focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                className="block h-6 w-6 group-data-[open]:hidden"
                aria-hidden="true"
              />
              <XMarkIcon
                className="hidden h-6 w-6 group-data-[open]:block"
                aria-hidden="true"
              />
            </DisclosureButton>
          </div>

          {/* CENTER SECTION: Logo */}
          <div className="relative flex-1">
            <div className="flex justify-center items-center sm:hidden">
              <img src={Logo} alt="Magic Munchies" className="h-40 w-auto" />
            </div>
          </div>

          {/* LEFT SECTION: Desktop Navigation Links */}
          <div className="hidden sm:flex sm:space-x-12 w-full justify-center">
            {navigation.map((item) => {
              // Now 'item' is defined in the context of the map callback
              const isActive = location.pathname === item.to;

              return (
                <Link
                  key={item.name}
                  to={item.to}
                  aria-current={isActive ? "page" : undefined}
                  className={classNames(
                    isActive
                      ? "bg-magicPeach text-black border border-someColor" // Replace with your desired border color classes
                      : "text-black hover:bg-magicPeach hover:text-white",
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
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.to}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-magicPeach text-black"
                  : "text-black hover:bg-magicPeach hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
