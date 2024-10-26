"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import fetcher from "../utils/fetcher";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Categories() {
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetcher("https://bstores-backend.vercel.app/categories/", setCategories, setLoading);
    });

    if (loading) return <Loader />;

    return (
        <section className="px-2">
            <div className="flex justify-center w-full ">
                <div className="flex scrollbar gap-2 max-w-6xl overflow-auto">
                    <Link href="/" className="category border border-gray-300 px-4 py-2 rounded-sm hover:bg-gray-100 text-nowrap">All</Link>
                    {categories.map((cat) => (
                        <Link href={{pathname: "/", query: {category: cat.name}}} key={cat.id} className="category border border-gray-300 px-4 py-2 rounded-sm hover:bg-gray-100 text-nowrap">
                            {cat.name}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Loader() {
    return (
        <div className="flex justify-center w-full">
            <div className="flex gap-2 max-w-6xl overflow-hidden">
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
                <div className="animate-pulse px-8 py-4 bg-gray-300 rounded-sm"></div>
            </div>
        </div>
    );
}
