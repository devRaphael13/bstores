"use client";
import fetcher from "../utils/fetcher";
import { useState, useEffect } from "react";

export default function Products() {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetcher("https://bstores-backend.vercel.app/products/", setProducts, setLoading);
    });

    if (loading) return <Loader />;

    return (
        <section className="flex justify-center my-20 px-2">
            <div className="grid lg:grid-cols-4 grid-cols-2 md:gap-x-4 lg:gap-y-16 md:gap-y-12 gap-y-8 gap-x-2 max-w-6xl">
                {products.map((product) => (
                    <article key={product.id} className="card relative overflow-hidden md:w-[250px] rounded-sm">
                        <div className="absolute flex flex-col justify-center px-2 gap-2 -top-full w-full h-full action">
                            <button className="block border border-oxfordblue bg-oxfordblue text-white px-4 py-2 rounded-sm">Add to cart</button>
                            <button className="block border border-foreground px-4 py-2 rounded-sm">Cancel</button>
                        </div>
                        <div className="md:w-[250px] h-[250px] rounded-sm">
                            <img className="md:w-[250px] h-[250px] rounded-sm object-cover" src={product.image} />
                        </div>
                        <div className="mt-4">
                            <h1 className="line-clamp-1">{product.name}</h1>
                            <p className="font-bold text-lg">₦{product.price}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

function Loader() {
    return (
        <section className="flex justify-center my-20 px-2">
            <div className="grid lg:grid-cols-4 grid-cols-2 md:gap-x-4 lg:gap-y-16 md:gap-y-12 gap-y-8 gap-x-2 max-w-6xl">
                {[...Array(6)].map((e, i) => (
                    <div key={i} className="md:w-[250px]">
                        <div className="md:w-[250px] w-[180px] h-[250px] rounded-sm bg-gray-300 animate-pulse"></div>
                        <div className="mt-4">
                            <div className="py-2 w-[150px] bg-gray-300 rounded-sm mb-1 animate-pulse"></div>
                            <div className="py-2 bg-gray-300 rounded-sm animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
