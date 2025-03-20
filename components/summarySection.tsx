import { Trash, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SummarySection() {
  return (
    <div className="w-full rounded-md bg-green-400 my-4 px-6 py-4">
      <div className="grid grid-cols-5">
        <div className="flex flex-col w-min pr-4">
          <h2 className="align-top text-2xl font-semibold text-white">สรุป</h2>
          <div className="flex-col mt-2 space-y-2 pr-4">
            <Button>
              <Trash size={4} />
              ลบรายการที่เลือกไว้
            </Button>
            <Button>
              <XCircle size={4} />
              ลบรายการที่สินค้าหมด
            </Button>
          </div>
        </div>
        <div className="col-span-3 flex w-full pl-4 align-top items-center gap-4 text-white pt-2 justify-center">
          <div className="flex flex-col text-center h-full justify-between">
            <h2 className="text-3xl align-top">ยอดทั้งหมด</h2>
            <p className="text-2xl">400.00 THB</p>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col text-center h-full justify-between">
            <h2 className="text-3xl align-top">ส่วนลดทั้งหมด</h2>
            <p className="text-2xl">0.00 THB</p>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col text-center h-full justify-between">
            <h2 className="text-3xl align-top">ราคารวม</h2>
            <p className="text-2xl">400.00 THB</p>
          </div>
        </div>
        <Button className="ml-auto h-full">
            ไปหน้าชำระเงิน
        </Button>
      </div>
    </div>
  );
}
