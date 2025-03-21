import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function page() {
    return (
        <div className="container mx-auto py-10">
            <LoginForm />
            <p className="text-center mt-4">
                Do not have an account?{" "}
                <Link href="/register" className="text-blue-600">
                    Register
                </Link>
            </p>
        </div>
    );
}
