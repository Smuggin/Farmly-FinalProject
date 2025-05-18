import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import React from "react";
interface MiniMenusProps {
  categories: { id: number; name: string }[];
}

export default function MiniMenus({ categories }: MiniMenusProps) {
  return (
    <div className="flex flex-col w-full mt-4 ml-3 rounded-xl border py-2">
      <div className="flex flex-col items-stretch gap-2 w-full">
        <div className="w-full">
          <Link
            href="/"
            className="block w-full text-left px-4 py-2 text-md rounded"
          >
            ทั้งหมด
          </Link>
        </div>
        <Separator className="my-1" />
        {categories.map((category) => (
          <React.Fragment key={category.id}>
            <div key={category.id} className="w-full">
              <Link
                href={`/?category=${encodeURIComponent(category.name)}`}
                className="block w-full text-left px-4 py-2 text-md rounded"
              >
                {category.name}
              </Link>
            </div>
            <Separator className="my-1" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
