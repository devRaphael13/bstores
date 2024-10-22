import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { ImFacebook } from "react-icons/im";
import { MdEmail } from "react-icons/md";

export default function Footer() {
    return (
        <section className="bg-[#001f3f] flex flex-col items-center gap-4 p-14">
            <div className="relative lines flex justify-center gap-6">
                <ImFacebook className="text-gray-300 w-5 h-5"/>
                <AiFillInstagram className="text-gray-300 w-5 h-5"/>
                <IoLogoWhatsapp className="text-gray-300 w-5 h-5"/>
                <MdEmail className="text-gray-300 w-5 h-5"/>
            </div>
            <h1 className="logo font-bold text-3xl text-gray-300">Bstores</h1>
            <small className="text-gray-300">Copyright &copy; 2024 Bstores ng</small>
        </section>
    );
}
