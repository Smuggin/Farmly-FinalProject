"use client";


import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faSquareXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session, status } = useSession(); 
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect if already logged in
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();

    // Perform the signIn call with credentials
    const result = await signIn("credentials", {
      redirect: false, // Prevent automatic redirection
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      setErrorMessage("Invalid email or password"); // Error message on failed login
    } else {
      setErrorMessage(""); // Clear any previous errors
      // You can redirect to the homepage or another page after successful login
      window.location.href = "/"; // or use `useRouter().push("/")`
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative w-1/2 h-screen">
        <Image
          src="/logo.jpg"
          fill
          style={{ objectFit: "cover" }}
          alt="Background"
          className="grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-500 to-transparent opacity-60" />
        <div className="absolute top-6 left-6 flex items-center space-x-2">
          <Image
            src="/FarmlyNeighbor_logo_prototype_2.png"
            width={40}
            height={40}
            alt="Logo"
          />
          <h1 className="text-white text-xl font-bold">
            Farmly <span className="font-light">Neighbour</span>
          </h1>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-6xl font-extrabold text-green-600">
            เข้าสู่ระบบ
          </h2>
          <p className="font-extrabold">
            ยินดีต้อนรับกลับมา เข้าสู่ระบบเพื่อไปสำรวจผลผลิตสดใหม่กัน!
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                อีเมล
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="อีเมล"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                รหัสผ่าน
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="รหัสผ่าน"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              เข้าสู่ระบบ
            </button>
          </form>
          <div className="flex items-center justify-center">
            <hr className="w-1/4 border-gray-300" />
            <span className="mx-2 text-gray-500">หรือ</span>
            <hr className="w-1/4 border-gray-300" />
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center py-2 px-4 border border-red-600 text-red-600 rounded-lg hover:bg-blue-50" onClick={() => signIn("google")}  >
              <FontAwesomeIcon
                icon={faGoogle}
                width={40}
                height={40}
                className=" text-red-600"
              />
              <span className="ml-4 flex-grow text-center">
                เข้าสู่ระบบด้วย Google  
              </span>
            </button>

            <button className="w-full flex items-center py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50" onClick={() => signIn("facebook")}>
              <FontAwesomeIcon
                icon={faFacebook}
                width={40}
                height={40}
                className=" text-blue-600"
              />
              <span className="ml-4 flex-grow text-center">
                เข้าสู่ระบบด้วย Facebook  
              </span>
            </button>

            <button className="w-full flex items-center py-2 px-4 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-50">
              <FontAwesomeIcon
                icon={faInstagram}
                width={40}
                height={40}
                className=" text-pink-500"
              />
              <span className="ml-4 flex-grow text-center">
                เข้าสู่ระบบด้วย Instagram
              </span>
            </button>

            <button className="w-full flex items-center py-2 px-4 border border-black text-black rounded-lg hover:bg-gray-100" onClick={() => signIn("twitter")}>
              <FontAwesomeIcon
                icon={faSquareXTwitter}
                width={40}
                height={40}
                className=" text-black"
              />
              <span className="ml-4 flex-grow text-center">
                เข้าสู่ระบบด้วย X
              </span>
            </button>
          </div>

          <div className="text-center mt-4">
            ยังไม่มีบัญชี?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              สมัครสมาชิก
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
