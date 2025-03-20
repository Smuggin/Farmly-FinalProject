"use client";
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function MiniMenus() {
  return (
    <NavigationMenu className="flex flex-col w-48 mt-4 ml-3 rounded-xl border py-2">
      <NavigationMenuList
        data-orientation="vertical"
        className="flex flex-col text-left items-start justify-start gap-2"
      >
        <NavigationMenuItem className="w-full text-left text-md">
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink
              className={`navigationMenuTriggerStyle() px-12`}
            >
              ผลไม้สด
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <Separator className="px-0"/>
        <NavigationMenuItem className="w-full text-left text-md">
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink
              className={`navigationMenuTriggerStyle() px-12`}
            >
              ผลไม้แปรรูป
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <Separator className="px-0"/>
        <NavigationMenuItem className="w-full text-left text-md">
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink
              className={`navigationMenuTriggerStyle() px-12`}
            >
              ผักสด
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <Separator className="px-0"/>
        <NavigationMenuItem className="w-full text-left text-md">
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink
              className={`navigationMenuTriggerStyle() px-12`}
            >
              สมุนไพร
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <Separator className="px-0"/>
        <NavigationMenuItem className="w-full text-left text-md">
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink
              className={`navigationMenuTriggerStyle() px-12`}
            >
              สมุนไพร
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <Separator className="px-0"/>
        <NavigationMenuItem className="w-full text-left text-md">
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink
              className={`navigationMenuTriggerStyle() px-12`}
            >
              สมุนไพร
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
