// app/404.jsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Halaman tidak ditemukan.</p>
      <Link href="/master/tracker">
        <button className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-800 active:bg-red-500 transition">
          Kembali ke Tracker
        </button>
      </Link>
    </div>
  );
}
