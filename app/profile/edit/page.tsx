"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    if (session?.user) {
      fetch("/api/user/profile")
        .then(res => res.json())
        .then(data => {
          setForm({
            name: data.name || "",
            phone: data.phone || "",
          });
        });
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/profile");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">แก้ไขข้อมูลส่วนตัว</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="ชื่อ"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="เบอร์โทร"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          บันทึก
        </button>
      </form>
    </div>
  );
}
