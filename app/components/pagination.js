"use client"

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { LuArrowLeftToLine } from "react-icons/lu";
import { LuArrowRightToLine } from "react-icons/lu";
import { useSearchParams } from "next/navigation";
import fetcher from "../utils/fetcher";
import { useState, useEffect} from "react";

export default function Pagination({ setProducts, setLoading, baseUrl, count }) {
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

            if ((next + 1) <= totalPages) {
                setPagNums([next - 1, next, next + 1])
            }
        }
    };

    const handlePrevBtn = () => {
        if (prev > 0) {
            setPrev(prev - 1);
            setNext(prev + 1);
            update_params(prev)

            if ((prev - 1) > 0) {
                setPagNums([prev - 1, prev, prev + 1])
            }
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