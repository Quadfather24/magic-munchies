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
  { name: "Gallery", to: "/gallery", current: false },
  { name: "About", to: "/about", current: false },
  { name: "Contact", to: "/contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  return (
    <Disclosure as="nav" className="bg-red-400">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {/* NAVBAR CONTAINER (flex, h-16) */}
        <div className="relative flex h-16 items-center">
          {/* LEFT SECTION (Mobile Menu Button + Desktop Nav) */}
          <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
            {/* MOBILE MENU BUTTON (VISIBLE ONLY ON SMALL SCREENS) */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton
                className="group relative inline-flex items-center justify-center 
                           rounded-md p-2 text-black hover:bg-gray-800 hover:text-red-300 
                           focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="absolute -inset-0.5" />
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

            {/* DESKTOP NAV LINKS (HIDDEN ON SMALL SCREENS) */}
            <div className="hidden sm:ml-6 sm:flex">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER SECTION (LOGO, ONLY VISIBLE ON SM+ SCREENS) */}

          <div className="flex flex-1 items-center justify-center">
            <img alt="Magic Munchies" src={Logo} className="h-36 w-auto" />
            {/* Adjust width/height to your preference */}
          </div>
        </div>
      </div>

      {/* MOBILE MENU (Disclosure Panel) */}
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
