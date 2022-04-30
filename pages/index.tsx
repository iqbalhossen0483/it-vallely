import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Banner from "../components/home/Banner";
import BannerSlider from "../components/home/BannerSlider";
import Categories from "../components/home/Categories";
import MetaTages from "../components/metaTags/MetaTages";
import ShopProducts from "../components/shared/ShopProducts";
import Cart from "../components/shared/utilitize/Cart";
import useStore from "../contex/hooks/useStore";
import { fetchAPI } from "../services/shared/sharedFunction";

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      const data = await fetchAPI<Product[]>(
        "https://cyclemart.herokuapp.com/products"
      );
      if (!data.error.internal && !data.error.server) {
        setProducts(data.data);
      } else {
        store?.State.setError(data.error);
      }
    })();
  }, [store?.State]);
  return (
    <>
      <MetaTages />
      <main>
        <div className='banner-container'>
          <Categories />
          <BannerSlider />
          <Banner />
        </div>
        <div className='product-container'>
          <div className='text-center pb-10'>
            <h3>Featured Products</h3>
            <p>Check & Get Your Desired Product !</p>
          </div>
          <div className='product-wrapper'>
            <ShopProducts products={products} />
          </div>
        </div>
        <Cart />
      </main>
    </>
  );
};

export default Home;
