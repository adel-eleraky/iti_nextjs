import ProductCard from '@/components/ProductsCard'
import Link from 'next/link'
import React from 'react'

interface Product {
    id: number
    title: string
    thumbnail: string
    category: string
    price: number
    description: string
}

interface Category {
    slug: string
    name: string
}

async function fetchCategories() {
    const res = await fetch('https://dummyjson.com/products/categories')
    const data = await res.json()
    return data
}

async function page({ params}: { params: { category: string} }) {

    const { category } = params


    const res = await fetch(`https://dummyjson.com/products/category/${category}`)

    const data = await res.json()

    const productsElements = data.products.map((product: Product) => {
        return <ProductCard key={product.id} product={product} />
    })

    const categories: Category[] = await fetchCategories()


    return (
        <div className="flex">
            <aside className="w-1/4 p-5 bg-gray-100 h-screen sticky top-0">
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                <ul>
                    {categories.slice(0,6).map((category: Category, index: number) => (
                        <li key={index} className="cursor-pointer p-2 rounded hover:bg-gray-200">
                            <Link href={`/categories/${category.slug}`}> {category.name} </Link>
                        </li>
                    ))}
                </ul>

                <button
                    className="mt-6 bg-red-500 text-white py-2 px-4 w-full rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </aside>

            <main className="w-3/4 p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {productsElements}
                </div>
            </main>
        </div>
    )
}

export default page
