import Image from "next/image"

export default async function Page({ params }: {
    params: { id: string }
}) {
    const { id } = params

    const res = await fetch(`https://dummyjson.com/products/${id}`)
    const product = await res.json()

    console.log(product)
    return (

        <div className="p-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-4 rounded shadow-2xl shadow-blue-100">
                {/* Images Section */}
                <div>
                    <div className="bg-gray-200 p-2 rounded">
                        <Image src={product.thumbnail} alt="Product" width={400} height={400} className="rounded" />
                    </div>
                    <div className="flex justify-between gap-2 mt-4">
                        {product.images.map((img: string, index: number) => (
                            <Image key={index} src={img} alt="Thumbnail" width={100} height={100} className="rounded bg-gray-200" />
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <hr className="my-2" />
                    <p className="text-lg font-semibold">Price: <span className="text-green-600">${product.price}</span></p>
                    <p className="text-lg">After Discount: <span className="text-red-600">${(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}</span></p>
                    <p className="text-lg">Rating: {product.rating} ⭐</p>
                    <hr className="my-2" />
                    <p className="text-gray-700"><strong>Brand:</strong> {product.brand}</p>
                    <p className="text-gray-700"><strong>Category:</strong> {product.category}</p>
                    <p className="text-gray-700">{product.stock} items in stock</p>

                    <div className="mt-4 flex gap-3">
                        <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
                            <i className="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                        <button className="bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2">
                            <i className="fa-regular fa-heart"></i> Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold">Description:</h2>
                <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="">

            </div>
            <h2 className="text-xl font-bold">Reviews</h2>
            <div className="mt-8 grid grid-cols-2 gap-20">
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Leave a Review</h3>
                    <form className="mt-2 flex flex-col gap-2">
                        <textarea placeholder="Write a review..." className="border p-2 rounded w-full"></textarea>
                        <label className="font-semibold">Rating:</label>
                        <input type="number" className="border px-2 py-1 w-20 rounded" />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Submit
                        </button>
                    </form>
                </div>

                <div className="mt-6 grid gap-10">
                    {product.reviews.map((review: any, index: number) => (
                        <div key={index}>
                            <div className="flex items-center gap-3">
                                <Image src="/user.png" width={40} height={40} alt="User" className="rounded-full" />
                                <h3 className="font-semibold">{review.reviewerName}</h3>
                            </div>
                            <p className="text-yellow-500">{review.rating} ⭐</p>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}