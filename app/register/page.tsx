"use client";

import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("รหัสผ่านไม่ตรงกัน กรุณาลองใหม่");
      return;
    }

    setPasswordError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiResponse(data.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
      } else {
        setApiResponse("สมัครสมาชิกสำเร็จ!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setApiResponse("เกิดข้อผิดพลาดในการสมัครสมาชิก");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div
          className="hidden md:block bg-cover bg-center"
          style={{ backgroundImage: "url('/logo.jpg')" }}
        ></div>

        <div className="p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-700">
            สมัครบัญชีใหม่
          </h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-600">ชื่อ</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">อีเมล</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">เบอร์โทรศัพท์</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">รหัสผ่าน</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">ยืนยันรหัสผ่าน</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
            >
              สมัครสมาชิก
            </button>

            {apiResponse && (
              <p className={`text-center mt-4 ${apiResponse.includes("สำเร็จ") ? 'text-green-500' : 'text-red-500'}`}>
                {apiResponse}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
