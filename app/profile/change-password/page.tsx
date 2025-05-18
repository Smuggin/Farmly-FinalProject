"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/user/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("เปลี่ยนรหัสผ่านเรียบร้อย");
    } else {
      alert("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">เปลี่ยนรหัสผ่าน</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="currentPassword"
          placeholder="รหัสผ่านปัจจุบัน"
          value={form.currentPassword}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="รหัสผ่านใหม่"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          เปลี่ยนรหัสผ่าน
        </button>
      </form>
    </div>
  );
}
