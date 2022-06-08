import { dbConnection } from "../serverServices/services/dbConnection";
import ShopProducts from "../components/shared/ShopProducts";
import BannerSlider from "../components/home/BannerSlider";
import Cart from "../components/shared/utilitize/Cart";
import Categories from "../components/home/Categories";
import Banner from "../components/home/Banner";
import useStore from "../contex/hooks/useStore";
import { useEffect } from "react";

type Props = {
  products: Product[];
  sliderImg: SliderImg[];
  bannerImg: BannerImg[];
};

const Home = ({ products, sliderImg, bannerImg }: Props) => {
  const store = useStore();
  useEffect(() => {
    const categories: string[] = [];
    products.forEach((single) => {
      if (!categories.includes(single.category)) {
        categories.push(single.category);
      }
    });
    store?.State.setCategories(categories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <>
      <main>
        <div className='banner-container'>
          <Categories />
          <BannerSlider images={sliderImg} />
          <Banner images={bannerImg} />
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

export async function getStaticProps() {
  const db = await dbConnection();
  const productsCollection = db.collection("products");
  const sliderImgCollection = db.collection("sliderImg");
  const bannerImgCollection = db.collection("bannerImg");
  const products: any = await productsCollection.find().toArray();
  const sliderImg: any = await sliderImgCollection.find().toArray();
  const bannerImg: any = await bannerImgCollection.find().toArray();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      sliderImg: JSON.parse(JSON.stringify(sliderImg)),
      bannerImg: JSON.parse(JSON.stringify(bannerImg)),
    },
    revalidate: 10,
  };
}
