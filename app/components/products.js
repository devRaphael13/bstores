"use client";
import { useSearchParams } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { LuArrowLeftToLine } from "react-icons/lu";
import { LuArrowRightToLine } from "react-icons/lu";
import fetcher from "../utils/fetcher";
import { useState, useEffect} from "react";

export default function Products() {
    const baseUrl = "https://bstores-backend.vercel.app/products/";
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState(baseUrl);
    const params = useSearchParams();
    const categoryParam = params.get("category");

    useEffect(() => {
        fetcher(url, setProducts, setLoading);
    }, [url]);

    useEffect(() => {
        if (products) {
        window.scrollTo({top: 0, left: 0, behavior: "smooth"})
        }
    }, [products])

    useEffect(() => {
        let query = [];

        if (categoryParam) {
            query.push(`category=${categoryParam}`);
        }

        const filterUrl = `${baseUrl}?${query.join("&")}`;

        if (filterUrl != url) {
            setLoading(true);
            setUrl(filterUrl);
        }
    }, [categoryParam]);

    if (loading) return <Loader />;

    if (products.results.length < 1) {
        return (
            <div className="my-20 w-full flex justify-center italic">
                <h1 className="inline-block text-center text-3xl text-gray-400 font-semibold">Nothing To Show...</h1>
            </div>
        );
    }

    return (
        <section className="flex flex-col items-center my-20 px-2 gap-20">
            {/* Product  */}
            <div className="grid lg:grid-cols-4 grid-cols-2 md:gap-x-4 lg:gap-y-16 md:gap-y-12 gap-y-8 gap-x-2 max-w-6xl">
                {products.results.length > 0 ? (
                    products.results.map((product) => (
                        <article key={product.id} className="card relative overflow-hidden md:w-[250px] rounded-sm">
                            <div className="absolute flex flex-col justify-center px-2 gap-2 -top-full w-full h-full action">
                                <button className="block border border-oxfordblue bg-oxfordblue text-white px-4 py-2 rounded-sm">Add to cart</button>
                                <button className="block border border-foreground px-4 py-2 rounded-sm">Cancel</button>
                            </div>
                            <div className="md:w-[250px] h-[250px] rounded-sm">
                                <img className="md:w-[250px] h-[250px] rounded-sm object-cover" src={product.image} />
                            </div>
                            <div className="mt-4">
                                <h1 className="line-clamp-1 uppercase">{product.name}</h1>
                                <p className="font-bold text-lg">₦{product.price}</p>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="my-20 w-full col-span-full flex justify-center italic">
                        <h1 className="inline-block text-center text-3xl text-gray-400 font-semibold">Nothing To Show...</h1>
                    </div>
                )}
            </div>
            {/* End of Product  */}
            <Pagination {...{ setProducts, setLoading, baseUrl, count: products.count }} />
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

function Pagination({ setProducts, setLoading, baseUrl, count }) {
    const url = `${baseUrl}?page=`;
    const totalPages = Math.floor(count / 10) + 1;
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(2);
    const [pagNums, setPagNums] = useState([1, 2, 3])
    const params = useSearchParams()

    const update_params = (page) => {
        const query = new URLSearchParams(params.toString())
        query.set("page", page)
        window.history.pushState({}, "", `${window.location.pathname}?${query.toString()}`)
    }

    const handleStartBtn = () => {
        setPrev(0);
        setNext(2)
        update_params(1)
    };

    const handleEndBtn = () => {
        setPrev(totalPages - 1);
        setNext(totalPages + 1);
        update_params(totalPages)
    };

    const handleNextBtn = () => {
        if (next <= totalPages) {
            setNext(next + 1);
            setPrev(next - 1);
            update_params(next)
        }
    };

    const handlePrevBtn = () => {
        if (prev >= 1) {
            setPrev(prev - 1);
            setNext(prev + 1);
            update_params(prev)
        }
    };

    const handleNumBtn = (event) => {
        const num = parseInt(event.target.textContent);
        setNext(num + 1)
        setPrev(num - 1)
        update_params(num)
    }

    const handleActiveBtn = (page) => {
        const pagebtns = document.getElementsByClassName("pagbtn")

        for (let btn of pagebtns) {
            if (parseInt(btn.textContent) == page) {
                btn.classList.add("active")
            } else {
                btn.classList.remove("active")
            }
        }
    }

    useEffect(() => {
        const page = params.get("page")
        if (page) fetcher(url + page, setProducts, setLoading)
        handleActiveBtn(page)

    }, [params])

    return (
        <div className="flex gap-2">
            <button onClick={handleStartBtn} className="border hover:border-oxfordblue border-gray-300 px-4 py-2 rounded-sm hover:bg-gray-100 text-nowrap"><LuArrowLeftToLine /></button>
            <button onClick={handlePrevBtn} className="border hover:border-oxfordblue border-gray-300 px-4 py-2 rounded-sm hover:bg-gray-100 text-nowrap"><IoIosArrowBack /></button>

            {pagNums.map((num, count) => (
            <button key={count} onClick={handleNumBtn} className="pagbtn hover:border-oxfordblue border border-gray-300 px-4 py-2 rounded-sm hover:bg-gray-100 text-nowrap">{num}</button>
            ))}
            <button onClick={handleNextBtn} className="border hover:border-oxfordblue border-gray-300 px-4 py-2 rounded-sm hover:bg-gray-100 text-nowrap"><IoIosArrowForward /></button>
            <button onClick={handleEndBtn} className="border hover:border-oxfordblue border-gray-300 px-4 py-2 rounded-sm hover:bg-gray-100 text-nowrap"><LuArrowRightToLine /></button>
        </div>
    );
}
