import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
  
export default function AddressList(){
    const range = Array.from({ length: 10 }, (_, i) => i + 1);
    return (
        <>
            <div className="rounded-md bg-green-500 flex overflow-x-auto overflow-hidden mt-8">
                <div className="grid grid-flow-col gap-4 p-4">
                    {range.map((num) => (
                        <Card key={num} className="gap-4">
                            <CardHeader className="pt-3 px-3">
                                <CardTitle className="text-xl font-medium">ณธรรม ทองเอียง</CardTitle>
                                <CardDescription className="text-md">0815977181</CardDescription>
                            </CardHeader>
                            <CardContent className="w-56 px-3">
                                <p>25/31 ม.9 ต.ตากแดด อ.เมือง จ.ชุมพร 86000</p>
                            </CardContent>
                            <CardFooter className="pb-3 px-3">
                                <Button className={`w-full h-full ${num === 1 ? "bg-gray-700 cursor-not-allowed" : ""}`} disabled={num === 1}>ใช้ที่อยู่นีั</Button>
                            </CardFooter>
                        </Card>
                    ))}
                    <div className="flex flex-col rounded-md bg-white items-center justify-center w-42 p-3">
                        เพิ่มที่อยู่เพิ่มเติม
                        <Plus className="w-24 h-24" strokeWidth={1}/>
                    </div>
                </div>
            </div>
        </>
    );
}