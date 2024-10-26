import Nav from "./components/navbar";
import Header from "./components/header";
import Categories from "./components/categories";
import Products from "./components/products";
import Footer from "./components/footer";
import OrderDialog from "./components/orderDialog";
import { Suspense } from "react";

export default function Home() {
    return (
        <div>
            <Nav />
            <Header />
            <Categories />
            <div>
                <Suspense>
                    <Products />
                </Suspense>
            </div>
            <Footer />
        </div>
    );
}
