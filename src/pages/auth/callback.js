
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function Callback() {
    const router = useRouter();

    useEffect(() => {

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN") {
                router.push("/");
            }
        });


        return () => authListener.subscription.unsubscribe();
    }, [router]);

    return <p>Loading...</p>;
}