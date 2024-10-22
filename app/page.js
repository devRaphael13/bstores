import Nav from "./components/navbar";
import Header from "./components/header";
import Categories from "./components/categories";
import Products from "./components/products";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div>
      <Nav />
      <Header />
      <Categories />
      <Products />
      <Footer />
    </div>
  );
}