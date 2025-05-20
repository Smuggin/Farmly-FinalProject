'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AddProduct() {
  const params = useParams();
  const storeId = Array.isArray(params.storeId)
    ? params.storeId[0]
    : params.storeId;
  const router = useRouter();

  const [formData, setFormData] = useState({
    productName: '',
    price: 0,
    unit: '',
    type: '',
    stock: 0,
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [apiResponse, setApiResponse] = useState('');
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch categories on mount
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Failed to load categories', err));
  }, []);

  // Generate image preview
  useEffect(() => {
    if (!file) {
      setPreviewUrl('');
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiResponse('');

    // Upload image if selected
    let imageUrl = '';
    if (file) {
      console.log('Uploading file:', file);
      const ext = file.name.split('.').pop();
      const fileName = `store-${storeId}/${Date.now()}.${ext}`;
      const { data, error: uploadError } = await supabase.storage
        .from('filesfarmly')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });
      console.log('Upload data:', data);
      if (uploadError) {
        console.error('Upload error:', uploadError);
        setApiResponse('Failed to upload image.');
        return;
      }

      const { data: publicUrlData } =
        supabase.storage.from('filesfarmly').getPublicUrl(data.path);
      if (!publicUrlData || !publicUrlData.publicUrl) {
        console.error('URL error: Failed to get public URL');
        setApiResponse('Failed to get image URL.');
        return;
      }
      imageUrl = publicUrlData.publicUrl;
    }

    // Send product data
    try {
      const res = await fetch('/api/addproduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          storeId: Number(storeId),
          coverImage: imageUrl,
          type: Number(formData.type),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error adding product');

      setApiResponse('เพิ่มสินค้าสำเร็จ!');
      // Reset form
      setFormData({ productName: '', price: 0, unit: '', type: '', stock: 0, description: '' });
      setFile(null);
      setTimeout(() => router.push(`/store/${storeId}`), 1500);
    } catch (err: any) {
      console.error(err);
      setApiResponse(err.message);
    }
  };

  return (
    <div className="grid grid-cols-[1.5fr_2fr] gap-8">
      {/* Image Preview & Upload */}
      <div className="flex flex-col items-center">
        <AspectRatio

          ratio={1 / 1}
          className="w-full bg-gray-100 rounded-md cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover rounded"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <Plus size={48} />
            </div>
          )}
        </AspectRatio>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-lg font-semibold">ชื่อสินค้า</label>
          <Input
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price & Unit */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-lg font-semibold">ราคาต่อหน่วย</label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-lg font-semibold">หน่วยนับ</label>
            <Select
              value={formData.unit}
              onValueChange={(val) => setFormData((p) => ({ ...p, unit: val }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="เลือกหน่วย" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {['kg','liter','piece','box','bottle','pack','bag'].map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category & Stock */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-lg font-semibold">หมวดสินค้า</label>
            <Select
              value={formData.type}
              onValueChange={(val) => setFormData((p) => ({ ...p, type: val }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="เลือกหมวด" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/3">
            <label className="block text-lg font-semibold">จำนวน</label>
            <Input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-semibold">รายละเอียด</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" className="bg-green-600 text-white">
            บันทึก
          </Button>
        </div>

        {/* Response */}
        {apiResponse && (
          <p
            className={`text-center mt-2 ${apiResponse.includes('สำเร็จ') ? 'text-green-600' : 'text-red-600'}`}
          >
            {apiResponse}
          </p>
        )}
      </form>
    </div>
  );
}