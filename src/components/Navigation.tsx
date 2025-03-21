"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

function Navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setIsLoggedIn(!!user); 
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setIsLoggedIn(!!session?.user);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <nav className="z-10 text-xl py-3 bg-sky-300">
            <ul className="flex gap-16 items-center justify-center">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/products">Products</Link></li>
                <li><Link href="/about">About</Link></li>
                {!isLoggedIn ? (
                    <>
                        <li><Link href="/login">Login</Link></li>
                        <li><Link href="/register">Register</Link></li>
                    </>
                ) : (
                    <li><Link href="/cart">Cart</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;