import Banner from "../components/home/Banner";
import BannerSlider from "../components/home/BannerSlider";
import Categories from "../components/home/Categories";
import MetaTages from "../components/metaTags/MetaTages";
import ShopProducts from "../components/shared/ShopProducts";
import Cart from "../components/shared/utilitize/Cart";
import { dbConnection } from "../util/services/dbConnection";

type Props = {
  products: any;
  sliderImg: any;
};

const Home = ({ products, sliderImg }: Props) => {
  const parsedProducts = JSON.parse(products);
  const parsedSliderImg = JSON.parse(sliderImg);
  return (
    <>
      <MetaTages />
      <main>
        <div className='banner-container'>
          <Categories />
          <BannerSlider images={parsedSliderImg} />
          <Banner />
        </div>
        <div className='product-container'>
          <div className='text-center pb-10'>
            <h3>Featured Products</h3>
            <p>Check & Get Your Desired Product !</p>
          </div>
          <div className='product-wrapper'>
            <ShopProducts products={parsedProducts} />
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
  const products: any = await productsCollection.find().toArray();
  const sliderImg: any = await sliderImgCollection.find().toArray();
  const parsedProducts = JSON.stringify(products);
  const parsedSliderImg = JSON.stringify(sliderImg);

  return {
    props: {
      products: parsedProducts,
      sliderImg: parsedSliderImg,
    },
  };
}
