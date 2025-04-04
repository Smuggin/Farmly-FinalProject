"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Logo from "@/app/dist/FarmlyNeighbor_logo_prototype_2.png";

// Type for the classNames function
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

// Type for the Navbar component
const Navbar: React.FC = () => {
  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-800">
      {({ open }) => (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-2">
          <div className="relative flex h-16 items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
                <Bars3Icon
                  aria-hidden="true"
                  className={`block size-6 ${open ? "hidden" : "block"}`}
                />
                <XMarkIcon
                  aria-hidden="true"
                  className={`hidden size-6 ${open ? "block" : "hidden"}`}
                />
              </DisclosureButton>
            </div>

            {/* Logo & Search */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                {/* This should be link after */}
                <a href="/"> 
                  <Image
                    alt="Farmly Neighbor"
                    src={Logo}
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                </a>
              </div>
              <div className="hidden sm:block leading-none max-w-md ml-4 font-bold text-xl">
                <a href="/">
                  Farmly
                  <br />
                  Neighbor
                </a>
              </div>
              <div className="hidden sm:block sm:ml-6 max-w-md w-full">
                <input
                  id="search"
                  name="search"
                  type="search"
                  placeholder="หาสินค้าที่คุณต้องการ"
                  className="h-full w-full border rounded-md outline-1 bg-white/5 px-4 py-2 text-base border-gray-300 placeholder:text-gray-500 focus:border-green-500 focus:outline-1 sm:text-sm"
                />
              </div>
              <div className="hidden sm:ml-2 sm:block">
                <button className="gap-1 border border-gray-300 px-6 flex py-3 rounded-md dark:border-accent text-base sm:text-sm text-gray-500 font-medium items-center focus:border-green-500 focus:outline-1">
                  <MapPinIcon className="w-4 h-4" />
                  ที่อยู่
                </button>
              </div>
            </div>

            {/* Profile & Cart */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
              >
                <ShoppingCartIcon aria-hidden="true" className="size-6" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-none">
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm text-gray-700 ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        Your Profile
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm text-gray-700 ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        Settings
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm text-gray-700 ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        Sign out
                      </a>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>

          {/* Mobile Menu */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Home
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Products
              </a>
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                About
              </a>
            </div>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
};

export default Navbar;
