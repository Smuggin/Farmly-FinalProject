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
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import CartDrawer from "@/components/CartDrawer";
import { useRouter } from "next/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  return (
    <>
      <Disclosure as="nav" className="bg-white dark:bg-gray-800">
        {({ open }) => (
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-2">
            <div className="relative flex h-16 items-center justify-between">
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

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
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
                  <form onSubmit={handleSearch} className="flex w-full">
                    <input
                      id="search"
                      name="search"
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="หาสินค้าที่คุณต้องการ"
                      className="h-full w-full border rounded-md outline-1 bg-white/5 px-4 py-2 text-base border-gray-300 placeholder:text-gray-500 focus:border-green-500 focus:outline-1 sm:text-sm"
                    />
                    
                  </form>
                </div>
                <div className="hidden sm:ml-2 sm:block">
                  <button className="gap-1 border border-gray-300 px-6 flex py-3 rounded-md dark:border-accent text-base sm:text-sm text-gray-500 font-medium items-center focus:border-green-500 focus:outline-1">
                    <MapPinIcon className="w-4 h-4" />
                    ที่อยู่
                  </button>
                </div>
                <div className="hidden sm:ml-2 sm:block">
                  <button className="gap-1 border border-gray-300 px-6 flex py-3 rounded-md dark:border-accent text-base sm:text-sm text-gray-500 font-medium items-center focus:border-green-500 focus:outline-1">
                    <a href="/community">ชุมชน</a>
                  </button>
                </div>
              </div>
              {/* Right Side: Cart + Profile/Login */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCartIcon aria-hidden="true" className="size-6" />
                </button>

                {/* Auth */}
                {isAuthenticated ? (
                  <Menu as="div" className="relative ml-3">
                    <MenuButton className="relative flex rounded-full text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                      <img
                        alt={session.user?.name || "User"}
                        src={session.user?.image || "/default-avatar.png"}
                        className="size-8 rounded-full"
                      />
                    </MenuButton>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            โปรไฟล์ของคุณ
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => signOut()}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "w-full text-left px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            ออกจากระบบ
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                ) : (
                  <button
                    onClick={() => signIn()}
                    className="ml-4 text-sm py-3 text-white bg-green-500 hover:bg-green-600 px-4 rounded-md"
                  >
                    เข้าสู่ระบบ
                  </button>
                )}
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
      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </>
  );
};

export default Navbar;
