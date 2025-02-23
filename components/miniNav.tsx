"use client"
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function MiniNav() {
  return (
    <NavigationMenu className="px-2 sm:px-2 lg:px-4 pb-4">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>หมวดหมู่สินค้า</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-4">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="ผลไม้สด">
                ค้นหาผลไม้สด ส่งตรงจากสวนของเกษตรกรได้ที่นี้
              </ListItem>
              <ListItem href="/docs/installation" title="ผลไม้แปรรูป">
                ค้นหาผลไม้แปรรูป คุณภาพสูงจากเกษตรกรมือดีของเรา              
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="ผักสด">
                เริ่มต้นจานสลัดของคุณ ด้วยผักคุณภาพสูงของเรา
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="สมุนไพร">
                ค้นพบยาสมุนไพรไทยหลากหลายๆชนิดได้ที่นี้
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="สมุนไพร">
                ค้นพบยาสมุนไพรไทยหลากหลายๆชนิดได้ที่นี้
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="สมุนไพร">
                ค้นพบยาสมุนไพรไทยหลากหลายๆชนิดได้ที่นี้
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              ค้นหาสวนผัก
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="col-start-2">
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...(props as { href: string })}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
