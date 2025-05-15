export default function Profile(){
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-400 p-6 text-white shadow-md rounded-b-2xl">
        <div className="flex items-center space-x-4">
          <img
            src="/user-profile.jpg"
            alt="User"
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <div>
            <h1 className="text-xl font-semibold">ชื่อผู้ใช้: สวนฟุด</h1>
            <p className="text-sm opacity-90">สมาชิกตั้งแต่: มกราคม 2024</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">ข้อมูลผู้ใช้งาน</h2>
        <div className="bg-white shadow rounded-lg p-4 space-y-2">
          <p><strong>อีเมล:</strong> user@example.com</p>
          <p><strong>เบอร์โทร:</strong> 08x-xxx-xxxx</p>
          <p><strong>ที่อยู่:</strong> ไม่ระบุ</p>
        </div>
      </div>

      {/* Orders */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">การสั่งซื้อของฉัน</h2>
        <div className="bg-white shadow rounded-lg p-4">
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>มะนาวลุงฟุด x 2</span>
              <span className="text-green-600 font-medium">฿240.00</span>
            </li>
            <li className="flex justify-between text-sm text-gray-600">
              <span>วันที่สั่งซื้อ: 12 พฤษภาคม 2025</span>
              <span>สถานะ: จัดส่งแล้ว</span>
            </li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            ดูคำสั่งซื้อทั้งหมด
          </button>
        </div>
      </div>

      {/* Preferences */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">การตั้งค่า</h2>
        <div className="bg-white shadow rounded-lg p-4 space-y-3">
          <button className="block w-full text-left text-gray-700 hover:text-green-600">
            แก้ไขข้อมูลส่วนตัว
          </button>
          <button className="block w-full text-left text-gray-700 hover:text-green-600">
            เปลี่ยนรหัสผ่าน
          </button>
          <button className="block w-full text-left text-red-500 hover:underline">
            ออกจากระบบ
          </button>
        </div>
      </div>
    </div>
  );
};
