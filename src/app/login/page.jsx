"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
    const router = useRouter();
    const { login, loading, error} = useAuthStore();
    const [form, setForm] = useState({
        appCode: "ASSESSMENT",
        moduleCode: "ALL",
        domain: "",
        user: "",
        password: "",
    });
    const [formError, setFormError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setFormError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.user || !form.password) {
            setFormError("Username dan Password wajib diisi!");
            return;
        }

        try {
            const res = await login(form);
            if (res) {
                console.log("Login berhasil:", res);
                const user = useAuthStore.getState().user;
                if (user) {
                    console.log(user)
                    router.push("/dashboard");
                } else {
                    setFormError("Password Salah");
                    return;
                }
            }
        } catch (err) {
            console.error("Error login:", err);

        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-green-600">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 py-10 rounded-3xl shadow-xl w-full max-w-md transform transition-transform duration-300 hover:scale-105"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Welcome Back</h1>
                    <p className="text-gray-500 text-sm">Please login to your account</p>
                </div>

                <input
                    type="text"
                    name="user"
                    placeholder="Username"
                    value={form.user}
                    onChange={handleChange}
                    className={`w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition ${formError && "border-red-600 placeholder:text-red-300"}`}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className={`w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition ${formError && "border-red-600 placeholder:text-red-300"}`}
                />

                {formError && (
                    <p className="text-red-500 text-sm mb-4 text-center">{formError}</p>
                )}

                {error && !formError && (
                    <p className="text-red-500 text-sm mb-4 text-center">
                        Username atau Password salah
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-400 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-50"
                >
                    {loading ? "Loading..." : "Login"}
                </button>



                <div className="mt-6 text-center text-gray-400 text-sm">
                    © 2025 KalbePharmachy. All rights reserved.
                </div>
            </form>
        </div>
    );
}
