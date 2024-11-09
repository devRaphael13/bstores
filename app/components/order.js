"use client";

import { useEffect, useState, useRef } from "react";

export default function Order({ isOrderOpen, setIsOrderOpen, currProduct, cart, setCart }) {
    const sizesRef = useRef(null);
    const coloursRef = useRef(null);
    const [colError, setColError] = useState(false);
    const [sizeError, setSizeError] = useState(false);
    const [colSize, setColSize] = useState({});

    const handleClick = (event, classname) => {
        let container = classname == "colour" ? coloursRef.current : sizesRef.current;
        container = container.getElementsByClassName(classname);

        for (const elem of container) {
            elem.classList.remove("active");
        }

        event.target.classList.add("active");
        setColSize({ ...colSize, [classname]: event.target.textContent });
    };

    useEffect(() => {
        const dialog = document.getElementById("order");

        if (isOrderOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    });

    const handleAddToCart = () => {
        if (currProduct) {
            setCart({ ...cart, [currProduct.id]:currProduct });
            setIsOrderOpen(false);
            resetChoice()
        }

        if (currProduct && currProduct.colours.length && !("colour" in colSize)) {
            setColError(true);
        }

        if (currProduct && currProduct.sizes.length && !("size" in colSize)) {
            setSizeError(true);
        }
    };

    const resetChoice = () => {
        let sizes = sizesRef.current;
        let colours = coloursRef.current;

        sizes = sizes.getElementsByClassName("active");

        for (const s of sizes) {
            s.classList.remove("active");
        }

        colours = colours.getElementsByClassName("active");

        for (const c of colours) {
            c.classList.remove("active");
        }
    };

    const handleCancel = () => {
        resetChoice()
        setIsOrderOpen(false);
        setColError(false);
        setSizeError(false);
        setColSize({});
    };

    return (
        <dialog id="order" className="border border-oxfordblue rounded-sm z-10 p-4 w-[400px]">
            <div>
                <small className="text-md">{currProduct && currProduct.category}</small>
                <h1 className="uppercase">{currProduct && currProduct.name}</h1>
                <p className="font-bold text-lg">₦{currProduct && currProduct.price}</p>
            </div>

            <div className="mt-4">
                {sizeError && <p className="text-red-500">Please select your size</p>}

                <h3 className="mb-1 font-semibold">Available Sizes</h3>
                <div ref={sizesRef} className="flex gap-1 flex-wrap">
                    {currProduct && currProduct.sizes.length ? (
                        currProduct.sizes.map((size, index) => (
                            <button
                                onClick={(event) => {
                                    handleClick(event, "size");
                                }}
                                key={index}
                                className="size px-4 py-2 rounded-sm bg-gray-300 border border-gray-300"
                            >
                                {size}
                            </button>
                        ))
                    ) : (
                        <div className="size px-4 py-2 rounded-sm bg-gray-300 border border-gray-300">N/A</div>
                    )}
                </div>
            </div>

            <div className="mt-4">
                {colError && <p className="text-red-500">Please select your preferred colour</p>}
                <h3 className="mb-1 font-semibold">Available Colours</h3>
                <div ref={coloursRef} className="flex gap-1 flex-wrap">
                    {currProduct && currProduct.colours.length ? (
                        currProduct.colours.map((colour, index) => (
                            <button
                                onClick={(event) => {
                                    handleClick(event, "colour");
                                }}
                                key={index}
                                className="colour px-4 py-2 rounded-sm bg-gray-300 border border-gray-300"
                            >
                                {colour}
                            </button>
                        ))
                    ) : (
                        <div className="colour px-4 py-2 rounded-sm bg-gray-300 border border-gray-300">N/A</div>
                    )}
                </div>
            </div>

            <div className="w-full flex gap-1 mt-4">
                <button onClick={handleAddToCart} className="border border-oxfordblue bg-oxfordblue text-white px-4 py-2 rounded-sm w-1/2">
                    Add To Cart
                </button>
                <button onClick={handleCancel} className="border border-oxfordblue px-4 py-2 rounded-sm w-1/2">
                    Cancel
                </button>
            </div>
        </dialog>
    );
}
