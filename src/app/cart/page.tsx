
"use client";

import withAuth from "@/components/WithAuth";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

 function Cart() {
    const { cart, removeFromCart, changeQuantity } = useCart();

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="container py-5">
            {cart.length === 0 ? (
                <div className="text-center">
                    <h3 className="text-danger fw-bold mb-4">Your Cart is Empty</h3>
                    <Link href="/categories" className="text-dark">
                        Back to Browse Products <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </Link>
                </div>
            ) : (
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th scope="col" className="w-50">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td className="d-flex align-items-center py-4">
                                            <i
                                                className="fa-regular fa-circle-xmark fs-4 cursor-pointer"
                                                onClick={() => removeFromCart(item.id)}
                                            ></i>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="img-fluid product-img d-block mx-3 rounded"
                                                style={{ backgroundColor: "#e5e5e5", width: "40px" }}
                                            />
                                            <p className="m-0">{item.title.substring(0, 20)}...</p>
                                        </td>
                                        <td className="price">${item.price}</td>
                                        <td className="qty">
                                            <div className="d-flex justify-content-center mt-3">
                                                <button
                                                    className="btn btn-success px-3 py-1 rounded"
                                                    onClick={() => changeQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                                <input
                                                    className="p-0 outline-0 mx-1 rounded qty-input"
                                                    value={item.quantity}
                                                    type="number"
                                                    readOnly
                                                />
                                                <button
                                                    className="btn btn-danger px-3 py-1 rounded"
                                                    onClick={() => changeQuantity(item.id, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                            </div>
                                        </td>
                                        <td className="total-price">${item.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="cart-total p-4 bg-light rounded">
                            <h3 className="mb-3">Total Price: ${totalPrice.toFixed(2)}</h3>
                            <div className="coupon-card mb-3">
                                <input
                                    className="form-control mb-2"
                                    type="text"
                                    placeholder="Coupon Code"
                                />
                                <button className="btn btn-primary w-100">Apply Coupon</button>
                            </div>
                            <button className="btn btn-success w-100">Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withAuth(Cart); 