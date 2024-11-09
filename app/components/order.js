"use client";

import { useEffect, useState, useRef } from "react";

export default function Order({ isOrderOpen, setIsOrderOpen, currProduct }) {
    const sizesRef = useRef(null);
    const coloursRef = useRef(null);

    const handleClick = (event, classname) => {
        let container = classname == "colours" ? coloursRef.current : sizesRef.current;
        container = container.getElementsByClassName(classname);

        for (const elem of container) {
            elem.classList.remove("active");
        }

        event.target.classList.add("active");
    };

    useEffect(() => {
        const dialog = document.getElementById("order");

        if (isOrderOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    });


    return (
        <dialog id="order" className="border border-oxfordblue  rounded-sm z-10 p-4 w-[400px]">
            <div>
                <small className="text-md">{currProduct && currProduct.category}</small>
                <h1 className="uppercase">{currProduct && currProduct.name}</h1>
                <p className="font-bold text-lg">₦{currProduct && currProduct.price}</p>
            </div>

            <div className="mt-4">
                <h3 className="mb-1">Available Sizes</h3>
                <div ref={sizesRef} className="flex gap-1 flex-wrap">
                    {currProduct && currProduct.sizes.length ? (
                        currProduct.sizes.map((size, index) => (
                            <button
                                onClick={(event) => {
                                    handleClick(event, "sizes");
                                }} 
                                key={index}
                                className="sizes px-4 py-2 rounded-sm bg-gray-300 border border-gray-300">{size}</button>
                        ))
                    ) : (
                        <div className="sizes px-4 py-2 rounded-sm bg-gray-300 border border-gray-300">N/A</div>
                    )}
                </div>
            </div>

            <div className="mt-4">
                <h3 className="mb-1">Available Colours</h3>
                <div ref={coloursRef} className="flex gap-1 flex-wrap">
                    {currProduct && currProduct.colours.length ? (
                        currProduct.colours.map((colour, index) => (
                            <button
                                onClick={(event) => {
                                    handleClick(event, "colours");
                                }}
                                key={index}
                                className="colours px-4 py-2 rounded-sm bg-gray-300 border border-gray-300">{colour}</button>
                        ))
                    ) : (
                        <div className="colours px-4 py-2 rounded-sm bg-gray-300 border border-gray-300">N/A</div>
                    )}
                </div>
            </div>

            <div className="w-full flex gap-1 mt-4">
                <button className="border border-oxfordblue bg-oxfordblue text-white px-4 py-2 rounded-sm w-1/2">Add To Cart</button>
                <button
                    onClick={() => {
                        setIsOrderOpen(false);
                    }}
                    className="border border-oxfordblue px-4 py-2 rounded-sm w-1/2"
                >
                    Cancel
                </button>
            </div>
        </dialog>
    );
}
