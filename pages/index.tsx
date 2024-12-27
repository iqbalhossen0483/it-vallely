import { useEffect } from "react";
import Banner from "../components/home/Banner";
import BannerSlider from "../components/home/BannerSlider";
import Categories from "../components/home/Categories";
import ShopProducts from "../components/shared/ShopProducts";
import Cart from "../components/shared/utilitize/Cart";
import useStore from "../contex/hooks/useStore";
import { dbConnection } from "../serverServices/mongodb/dbConnection";

type Props = {
  products: Product[];
  sliderImg: SliderImg[];
  bannerImg: BannerImg[];
  error?: boolean;
};

const Home = ({ products, sliderImg, bannerImg, error }: Props) => {
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

  if (error) {
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    );
  }

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
  const { database } = await dbConnection();
  if (!database) {
    return {
      props: {
        error: true,
      },
      revalidate: 10,
    };
  } else {
    const productsCollection = database.collection("products");
    const sliderImgCollection = database.collection("sliders");
    const bannerImgCollection = database.collection("banners");
    const sliderImg: any = await sliderImgCollection.find().toArray();
    const bannerImg: any = await bannerImgCollection.find().toArray();
    const products: any = await productsCollection
      .find()
      .sort({ created_at: -1 })
      .project({
        _id: 1,
        name: 1,
        price: 1,
        prevPrice: 1,
        productImg: 1,
        category: 1,
      })
      .toArray();

    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        sliderImg: JSON.parse(JSON.stringify(sliderImg)),
        bannerImg: JSON.parse(JSON.stringify(bannerImg)),
      },
      revalidate: 10,
    };
  }
}
