"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react"; // Trash icon
import { Card, CardContent } from "@/components/ui/card";

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, setIsOpen }) => {
  const { items, removeItem } = useCart();

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerContent className="w-80 max-w-full">
        <DrawerHeader>
          <DrawerTitle>ตะกร้าสินค้า</DrawerTitle>
          <DrawerDescription>รายการสินค้าที่คุณเลือก</DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-4 max-h-[60vh] overflow-auto">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">ไม่มีสินค้าในตะกร้า</p>
          ) : (
            items.map((item, i) => (
              <Card key={i} className="flex items-center p-3">
                <CardContent className="p-0 flex flex-col gap-1 w-full">
                <div className="flex justify-between">
                    <img
                        src={item.coverImage || "https://upload.wikimedia.org/wikipedia/commons/c/cd/1%261_logo.svg"}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex flex-col flex-1 px-4">
                        <p className="font-medium w-full">{item.name}</p>
                        <p className="text-muted-foreground text-xs">x{item.quantity}{item.unit} -  ฿{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Remove item"
                        onClick={() => removeItem(i)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <DrawerFooter className="flex flex-col gap-2">
          <Button className="w-full">ไปยังหน้าชำระเงิน</Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              ปิด
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
