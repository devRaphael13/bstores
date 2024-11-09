import { FaMoon } from "react-icons/fa";
import { AiFillSun } from "react-icons/ai";

export default function Nav() {
    return (
        <nav className="sticky z-20 top-0 flex bg-white justify-center py-4 px-2 border-b border-gray-300 border-solid">
            <div className="flex justify-between w-full max-w-6xl items-center">
                <h1 className="logo font-bold text-4xl">Bstores</h1>
                <div>
                    <button id="dark">
                        <FaMoon />
                    </button>

                    {/* <button>
                <AiFillSun />
            </button> */}
                </div>
            </div>
        </nav>
    );
}
