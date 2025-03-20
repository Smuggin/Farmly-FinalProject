import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { HomeIcon, MessagesSquare, Trash , ShareIcon } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function CartList(){
    const range = Array.from({ length: 10 }, (_, i) => i + 1);
    return (
        <div className="w-full">
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-2/5 text-center">สินค้า</TableHead>
                    <TableHead className="text-center">ราคาต่อหน่วย</TableHead>
                    <TableHead className="text-center">จำนวน</TableHead>
                    <TableHead className="text-center">รวม</TableHead>
                    <TableHead className="text-center">จัดการ</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {range.map((num) => (
                    <TableRow key={num}>
                    <TableCell className="font-medium">
                        <div className="items-center flex my-4">
                            <Checkbox className="w-6 h-6"/>
                            <div className="w-32 h-32">
                                <AspectRatio ratio={1 / 1}>
                                    <div className="bg-gray-400 w-full h-full rounded-md mx-4"/>
                                </AspectRatio>
                            </div>
                            <div className="flex flex-col">
                                <p className="ml-8 flex items-center">
                                    <HomeIcon className="w-4 h-4 mr-1"/>สวนลุงดำ
                                </p>
                                <p className="ml-8 flex items-center text-2xl">
                                    สินค้า A
                                    </p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="text-center">$250.00</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">$250.00</TableCell>
                    <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                            <MessagesSquare />
                            <Trash />
                            <ShareIcon />
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
                </Table>
            {/* <div className="mt-10 rounded-md bg-green-500 px-8 py-4">
                <p className="text-2xl text-white">
                    สรุป
                </p>
            </div> */}
        </div>
    );
}