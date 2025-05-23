'use client';

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { useParams } from 'next/navigation';

export default function Navbar({ profilePic }: { profilePic: string }) {
  const params = useParams();
  const action = params?.action;
  const actionStr = Array.isArray(action) ? action[0] : action;

const titles: Record<string, string> = {
    products: 'จัดการสินค้า',
    categories: 'หมวดหมู่',
    orders: 'จัดการออเดอร์',
  };

  const title = actionStr
    ? titles[actionStr] ?? actionStr
    : 'หน้าแรก';

  return (
    <div className="flex items-center justify-between p-4 border-b">
      {/* Page title based on dynamic route */}
      <h1 className="text-2xl font-semibold px-3">{title}</h1>
            
              
      {/* User menu */}
      <Menu as="div" className="relative">
        
        <MenuButton className="rounded-full focus:outline-none">
          <img
            src={profilePic}
            alt="User"
            className="h-8 w-8 rounded-full"
          />
        </MenuButton>
        <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5">
          <MenuItem>
            {({ active }) => (
              <a
                href="/profile"
                className={`block px-4 py-2 text-sm ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                โปรไฟล์ของคุณ
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => signOut()}
                className={`w-full text-left px-4 py-2 text-sm ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                ออกจากระบบ
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
