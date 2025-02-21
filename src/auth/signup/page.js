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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("รหัสผ่านไม่ตรงกัน กรุณาลองใหม่");
      return;
    }

    setPasswordError("");
    console.log("Signup Data:", formData);
    alert("สมัครบัญชีสำเร็จ!");
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
                className={`w-full p-3 border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none ${
                  passwordError
                    ? "focus:ring-2 focus:ring-red-500"
                    : "focus:ring-2 focus:ring-green-500"
                }`}
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
          </form>

          <p className="text-center text-gray-600 mt-4">
            มีบัญชีอยู่แล้ว?{" "}
            <a href="../" className="text-green-500 hover:underline">
              เข้าสู่ระบบ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
