"use client"

import { IoBagCheck } from "react-icons/io5";
import { useEffect } from "react";

export function Cart({ cart, setCart, isCartOpen, setIsCartOpen }) {
    useEffect(() => {
        const cartModal = document.getElementById("cartModal")

        if (isCartOpen) cartModal.show()
        else cartModal.close()
    }, [isCartOpen])

    const removeFromCart = (id) => {
        setCart([...cart.filter((item) => item.id != id)]);
    };

    const continueShopping = () => {
        setIsCartOpen(false)
    }

    return (
        <dialog id="cartModal" className="max-w-[500px] min-w-[360px] rounded border-2 border-oxfordblue sticky bottom-[29%] left-[73%]">
            <div className="p-1 w-full bg-oxfordblue">
                <h1 className="text-white text-center">Cart</h1>
            </div>
            <section className="flex flex-col gap-1 p-1 ">
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <article key={item.id} className="card flex relative overflow-hidden gap-2 p-2 rounded">
                            <div className="absolute flex flex-col justify-center items-center px-2 gap-2 -top-full w-full h-full action">
                                <button
                                    onClick={() => {
                                        removeFromCart(item.id);
                                    }}
                                    className="block border border-red-500 text-red-500 px-4 py-2 rounded-sm"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="md:w-[100px] h-[100px] rounded">
                                <img className="md:w-[100px] h-[100px] rounded object-cover" src={item.image} />
                            </div>
                            <div>
                                <h1 className="uppercase">{item.name}</h1>
                                <p className="font-bold text-lg">₦{item.price}</p>
                                <div className="flex gap-1">
                                    {item.size && <div className="px-4 py-1 rounded-sm bg-gray-300 border border-gray-300">Size {item.size}</div>}
                                    {item.colour && <div className="px-4 py-1 rounded-sm bg-gray-300 border border-gray-300">Colour {item.colour}</div>}
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="w-full my-8 flex justify-center italic">
                        <h1 className="inline-block text-center text-3xl text-gray-400 font-semibold">Cart is Empty</h1>
                    </div>
                )}
            </section>
            {cart.length > 0 && (
                <div className="flex gap-1 p-2">
                    <button className="block w-1/2 border border-oxfordblue bg-oxfordblue text-white px-4 py-2 rounded-sm ">Confirm Order</button>
                    <button onClick={continueShopping} className="block w-1/2 border border-oxfordblue px-4 py-2 rounded-sm">Continue Shopping</button>
                </div>
            )}
        </dialog>
    );
}

export function CartButton({ count, isCartOpen, setIsCartOpen }) {
    const handleClick = () => {
        setIsCartOpen(!isCartOpen)
    }

    return (
        <button onClick={handleClick} className="sticky bg-oxfordblue p-4 rounded-full left-[85%] bottom-[20%] text-white">
            <span className="absolute bg-gray-300 text-foreground z-10 right-[75%] top-[0] px-1.5 border-2 border-white rounded-full">{count}</span>
            <IoBagCheck size={28} />
        </button>
    );
}
