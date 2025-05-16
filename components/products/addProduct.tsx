"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";




export default function AddProduct() {
  const params = useParams();
  const storeId = Array.isArray(params.storeId) ? params.storeId[0] : params.storeId;
  const router = useRouter();

  const [formData, setFormData] = useState({
    productName: "",
    price: 0,
    unit: "",
    type: "",
    stock: 0,
    description: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [apiResponse, setApiResponse] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/addproduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName: formData.productName,
        price: Number(formData.price),
        unit: formData.unit,
        type: parseInt(formData.type), // แปลงให้เป็น number
        stock: Number(formData.stock),
        description: formData.description,
        storeId: Number(storeId),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setApiResponse(data.message || "เกิดข้อผิดพลาดบางอย่าง");
    } else {
      setApiResponse("เพิ่มสินค้าสำเร็จ!");
      setFormData({
        productName: "",
        price: 0,
        unit: "",
        type: "",
        stock: 0,
        description: "",
      });
      setTimeout(() => {
          router.push(`/store/${storeId}`);
        }, 2000); // 2 วินาที
      }
    
  } catch (error) {
    console.error("Error:", error);
    setApiResponse("เพิ่มสินค้าไม่สำเร็จ!");
  }
};

  return (
    <div className="grid grid-cols-[1.5fr_2fr]">
      <div className="w-[500px] rounded-md pl-7">
        <AspectRatio
          ratio={1 / 1}
          className="rounded-md bg-gray-300"
        ></AspectRatio>
      </div>
      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <label className="text-2xl font-bold w-full">ชื่อสินค้า</label>
          </div>
          <input
            type="text"
            onChange={handleChange}
            name="productName"
            className="font-bold text-4xl border border-t border-gray-400 rounded-lg mt-2"
          />
          <div className="mt-2 align-middle my-auto">
            <div className="flex justify-between items-center mt-2">
              <label className="text-2xl font-bold w-full">ราคาต่อหน่วย</label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                type="number"
                onChange={handleChange}
                name="price"
                className="text-lg border border-gray-400 rounded-lg w-1/6 px-2 mr-2"
                placeholder="ราคา"
              />
              <Select 
                value={formData.unit}
                onValueChange={(value) => setFormData({ ...formData, unit: value })}
              >
                <SelectTrigger className="border-gray-400 w-1/6">
                  <SelectValue placeholder="หน่วยนับ"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="kg">กิโลกรัม</SelectItem>
                    <SelectItem value="liter">ลิตร</SelectItem>
                    <SelectItem value="piece">ชิ้น</SelectItem>
                    <SelectItem value="box">กล่อง</SelectItem>
                    <SelectItem value="bottle">ขวด</SelectItem>
                    <SelectItem value="pack">แพ็ค</SelectItem>
                    <SelectItem value="bag">ถุง</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* <Button className="bg-green-500 text-white rounded-lg px-4 py-2">
                <Plus></Plus>เพิ่มราคา
              </Button> */}
            </div>
          </div>
          <div className="flex items-center mt-2 space-x-2">
            <div className="w-1/6">
              <div className="flex justify-between items-center mt-2">
                <label className="text-2xl font-bold w-full">ชนิดสินค้า</label>
              </div>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
                
              >
                <SelectTrigger className="w-full border-gray-400 mt-2">
                  <SelectValue placeholder="ชนิดสินค้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/5">
              <div className="flex justify-between items-center mt-2">
                <label className="text-2xl font-bold w-full">จำนวนสินค้า</label>
              </div>
              <Input
                type="number"
                min="1"
                name="stock"
                onChange={handleChange}
                className="text-lg border border-gray-400 rounded-lg mt-2 w-36"
                placeholder="จำนวนสินค้า"
              />
            </div>
          </div>
          <hr className="mt-6 items-center" />
          <div className="flex justify-between items-center mt-3">
            <label className="text-2xl font-bold w-full">
              รายละเอียดสินค้า
            </label>
          </div>
          <Textarea
            className="max-h-full mt-2"
            name="description"
            onChange={handleChange}
            placeholder="เพิ่มรายละเอียดสินค้า"
          />
          <div className="flex justify-end mt-4 w-full">
            <Button
              type="submit"
              className="bg-green-500 text-white rounded-lg px-4 py-2"
            >
              บันทึก
            </Button>

          </div>
        </form>
                    {apiResponse && (
          <p
            className={`mt-4 text-center ${
              apiResponse.includes("สำเร็จ") ? "text-green-600" : "text-red-600"
            }`}
          >
            {apiResponse}
          </p>
        )}
      </div>
    </div>
  );
}
