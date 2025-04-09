import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface MiniMenusProps {
  categories: { id: number; name: string }[];
}

export default function MiniMenus({ categories }: MiniMenusProps) {
  return (
    <NavigationMenu className="flex flex-col w-48 mt-4 ml-3 rounded-xl border py-2">
      <NavigationMenuList className="flex flex-col text-left items-start justify-start gap-2">
        <NavigationMenuItem className="w-full text-left text-md">
          <NavigationMenuLink asChild>
            <Link href="/">ทั้งหมด</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <Separator />

        {categories.map((category) => (
          <NavigationMenuItem
            key={category.id}
            className="w-full text-left text-md"
          >
            <NavigationMenuLink asChild>
              <Link href={`/?category=${encodeURIComponent(category.name)}`}>
                {category.name}
              </Link>
            </NavigationMenuLink>
            <Separator />
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
