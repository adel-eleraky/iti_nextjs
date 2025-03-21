"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { signUp, signInWithOAuth } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const { error } = await signUp(email, password);
            if (error) throw error;
            router.push("/login");
            alert("Check your email for the confirmation link!");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSignUp = async () => {
        setError(null);

        try {
            const { error } = await signInWithOAuth("google");
            if (error) throw error;
            router.push("/"); 
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Register</h2>

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
                    Register
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

                <div className="mt-6">
                    <button
                        onClick={handleGoogleSignUp}
                        className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300"
                    >
                        <FcGoogle className="w-5 h-5 mr-2" />
                        <span>Register with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
}