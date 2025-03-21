"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

interface Product {
    id: number;
    title: string;
    thumbnail: string;
    category: string;
    price: number;
    description: string;
}

const ProductCard = ({ product }: { product: Product }) => {
    const { thumbnail, id, title, price, description, category } = product;
    const { addToCart } = useCart(); // Use the Cart Context
    const router = useRouter()

    const handleAddToCart = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push("/login"); // Redirect to login page if not authenticated
            return;
        }

        addToCart({
            id,
            title,
            image: thumbnail,
            price,
            quantity: 1, // Default quantity
        });
        toast.success(`${title} added to cart!`);
    };
    
    return (
        <div className="relative border p-3 mb-3 rounded-lg shadow-md">
            <span className="absolute top-2 right-2 text-red-600 cursor-pointer">
                <i className="fa-solid fa-heart"></i>
            </span>
            <Image
                className="w-full h-72 object-contain mb-3 rounded-md"
                src={thumbnail}
                alt="product img"
                width={100}
                height={100}
            />
            <div className="space-y-3">
                <div className="text-orange-500">{category}</div>
                <div className="font-bold text-lg truncate">{title}</div>
                <hr className="border-gray-300" />
                <div className="truncate">{description}</div>
                <div className="font-bold text-gray-700">Price: ${price}</div>
                <div className="flex gap-5">
                    <button
                        onClick={handleAddToCart} // Add to Cart functionality
                        className="w-full bg-green-700 text-white font-bold py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-800 transition"
                    >
                        <i className="fa-solid fa-cart-plus"></i>
                        <span>Add to Cart</span>
                    </button>
                    <Link
                        href={`/products/${id}`}
                        className="w-full bg-yellow-700 text-white font-bold py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-yellow-800 transition"
                    >
                        <i className="fa-solid fa-eye"></i>
                        <span>View Details</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;