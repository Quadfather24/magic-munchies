import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Logo from "../assets/vertical-logo.png";

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
  return (
    <Disclosure as="nav" className="bg-magicPink rounded-sm ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {/* NAVBAR CONTAINER */}
        <div className="relative flex h-16 items-center justify-between">
          {/* LEFT SECTION (Mobile Menu Button + Desktop Nav) */}
          <div className="flex items-center">
            {/* MOBILE MENU BUTTON */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton
                className="group relative inline-flex items-center justify-center 
                           rounded-md p-2 text-black hover:bg-gray-800 hover:text-red-300 
                           focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>

            {/* DESKTOP NAV LINKS */}
            <div className="hidden sm:flex sm:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-magicPeach text-black"
                      : "text-black hover:bg-magicPeach hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CENTER SECTION (LOGO) */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src={Logo}
              alt="Magic Munchies"
              className="h-36 w-auto sm:h-48"
            />
          </div>

          {/* RIGHT SECTION (For any additional buttons or content) */}
          <div className="hidden sm:flex sm:items-center">
            {/* Add right-aligned items like buttons here if needed */}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
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
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
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
