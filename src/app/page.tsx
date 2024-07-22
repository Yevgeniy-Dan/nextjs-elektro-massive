import Image from "next/image";
import { strapiApi } from "../../lib/api";
import ProductList from "../components/ProductList";

export default async function Home() {
  const products = await strapiApi.getProducts();

  return (
    <main className=" min-h-screen p-24">
      <div className="w-full">
        <ProductList items={products} />
      </div>
    </main>
  );
}
