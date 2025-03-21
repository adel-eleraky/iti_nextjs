"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
                return;
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            setError("An error occurred during login");
        }
    };

    const handleOAuthSignIn = async (provider) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: "http://localhost:3000/auth/callback", 
            },
        });

        if (error) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>

            {error && (
                <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
                >
                    Login
                </button>
            </form>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <button
                        onClick={() => handleOAuthSignIn("google")}
                        className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300"
                    >
                        <FcGoogle className="w-5 h-5 mr-2" />
                        <span>Login with Google</span>
                    </button>

                   
                </div>
            </div>
        </div>
    );
}