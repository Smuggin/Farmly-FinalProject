"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CreateStorePage() {
  const router = useRouter();
  const session = useSession();
  const user_id = session.data?.user.user_id
  const [form, setForm] = useState({
    name: "",
    description: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "ไทย",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // 1. Create the store first (backend should return store id)
    const response = await axios.post("/api/store/create", form);
    const storeId = response.data.store?.id;

if (!storeId) throw new Error("Failed to get store ID from response.");


      if (!storeId) throw new Error("Failed to get store ID from response.");

      // 2. Upload image to Supabase Storage
      let fileUrl = "";
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `store-${storeId}-${Date.now()}.${fileExt}`;
        const filePath = `stores/${storeId}/${fileName}`;

        const { data, error: uploadError } = await supabase.storage
          .from("filesfarmly")
          .upload(filePath, imageFile, {
            cacheControl: "3600",
            upsert: false,
            contentType: imageFile.type,
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from("filesfarmly")
          .getPublicUrl(filePath);

        fileUrl = publicUrlData.publicUrl;

        // 3. Save file metadata to your DB (related to storeId)
        await axios.post("/api/file/create", {
          table: "store",
          recordId: storeId,
          filename: fileName,
          contentType: imageFile.type,
          url: fileUrl,
          storeId,
        });
      }

      router.push("/store/dashboard");
    } catch (err) {
      console.error("Store creation or image upload failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-center text-green-700">สร้างร้านค้าใหม่</h1>

      <div className="space-y-4">
        <div>
          <Label>ชื่อร้าน</Label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div>
          <Label>คำอธิบายร้าน</Label>
          <Textarea name="description" value={form.description} onChange={handleChange} />
        </div>

        <h2 className="font-semibold mt-6 text-lg text-green-700">ที่อยู่ร้าน</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>ถนน</Label>
            <Input name="street" value={form.street} onChange={handleChange} />
          </div>
          <div>
            <Label>แขวง/ตำบล</Label>
            <Input name="city" value={form.city} onChange={handleChange} />
          </div>
          <div>
            <Label>เขต/อำเภอ</Label>
            <Input name="state" value={form.state} onChange={handleChange} />
          </div>
          <div>
            <Label>รหัสไปรษณีย์</Label>
            <Input name="postalCode" value={form.postalCode} onChange={handleChange} />
          </div>
          <div className="col-span-2">
            <Label>ประเทศ</Label>
            <Input name="country" value={form.country} onChange={handleChange} />
          </div>
        </div>

        {/* Image upload */}
        <div>
          <Label>รูปภาพร้าน</Label>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {imageFile && <p className="mt-1 text-sm text-gray-500">{imageFile.name}</p>}
        </div>

        <Button className="mt-6 w-full bg-green-600 hover:bg-green-700" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "กำลังสร้าง..." : "สร้างร้านค้า"}
        </Button>
      </div>
    </div>
  );
}
