// components/withAuth.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function withAuth(Component) {
    return function ProtectedRoute(props) {
        const router = useRouter();

        useEffect(() => {
            const checkAuth = async () => {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    router.push("/login");
                }
            };

            checkAuth();
        }, [router]);

        return <Component {...props} />;
    };
}