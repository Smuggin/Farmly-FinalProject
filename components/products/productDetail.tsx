import Image from "next/image"

import * as React from "react"
import { Minus, Plus, Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function ProductDetail(){
    return (
        <>
        <div className="grid grid-cols-[1.5fr_2fr]">
            <div className="w-[500px] rounded-md pl-7">
                <AspectRatio ratio={1 / 1}>
                    <div className="bg-gray-200 w-full h-full rounded-md"></div>
                </AspectRatio>
            </div>
            <div className="w-full">
                <h1 className="font-bold text-4xl">มังคุดลุงดำ</h1>
                <h2 className="text-sm text-green-500 mt-1">ผลไม้</h2>
                <h3 className="text-3xl font-semibold mt-1">฿ 100.00</h3>
                <hr className="my-4"></hr>
                <div className="pb-0 w-full flex items-center">
                    <div className="flex items-center justify-center space-x-2 w-44">
                    <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-md">
                        <Minus />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex-1 text-center border border-gray-200 shadow-sm p-1 rounded-md">
                        <div className="font-light tracking-tighter">
                            Test
                        </div>
                    </div>
                    <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-md">
                        <Plus />
                        <span className="sr-only">Increase</span>
                    </Button>
                    </div>
                    <p className="font-semibold text-green-500 ml-4">
                        (ต่อ กิโลกรัม)
                    </p>
                </div>
                <div className="w-full mt-4 space-x-2">
                    <Button className="bg-green-500 font-light"><ShoppingBag />เพิ่มลงตระกร้า</Button>
                    <Button variant="outline" size="icon">
                        <Heart />
                    </Button>
                </div>
                <div className="mt-4">
                    สถานะสินค้า
                </div>
                <div className="mt-4">
                    ประเภทสินค้า
                </div>
            </div>
        </div>
        <div className="w-full mt-8 pl-8">
            <div className="flex space-x-6">
                <div>รายละเอียดสินค้า</div>
                <div>รีวิวสินค้า</div>
                <div>รายละเอียดของเกษตรกร</div>
            </div>
            <div className="grid grid-cols-[0.6fr_1.5fr] mt-4 gap-12">
                <div className="w-full border border-gray-400 rounded-md shadow-xl px-6">
                    <div className="h-48 w-48 rounded-full border items-center mx-auto mt-4"></div>
                    <div className="text-3xl">สวนลุงดำ</div>
                    <p className="text-xl font-light"> location</p>
                </div>
                <div className="w-full border border-gray-400 rounded-md shadow-xl">
                    <div className="h-64 rounded-full"></div>
                </div>
            </div>
        </div>
        </>
    );
}