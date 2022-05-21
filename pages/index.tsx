import Banner from "../components/home/Banner";
import BannerSlider from "../components/home/BannerSlider";
import Categories from "../components/home/Categories";
import MetaTages from "../components/metaTags/MetaTages";
import ShopProducts from "../components/shared/ShopProducts";
import Cart from "../components/shared/utilitize/Cart";
import useStore from "../contex/hooks/useStore";
import { fetchAPI } from "../services/shared/sharedFunction";

type Props = {
  error: string | null;
  netProblem: boolean;
  data: Product[] | null;
  sliderImg: SliderImg[] | null;
};

const Home = ({ data, sliderImg, netProblem, error }: Props) => {
  const store = useStore();
  if (netProblem) {
    store?.State.setError(netProblem);
  } else if (error) {
    store?.State.setAlert(error);
  }
  return (
    <>
      <MetaTages />
      <main>
        <div className='banner-container'>
          <Categories />
          <BannerSlider images={sliderImg} />
          <Banner />
        </div>
        <div className='product-container'>
          <div className='text-center pb-10'>
            <h3>Featured Products</h3>
            <p>Check & Get Your Desired Product !</p>
          </div>
          <div className='product-wrapper'>
            <ShopProducts products={data} />
          </div>
        </div>
        <Cart />
      </main>
    </>
  );
};

export default Home;

type Data = {
  props: {
    error: string | null;
    netProblem: boolean;
    data: Product[] | null;
    sliderImg: SliderImg[] | null;
  };
};
export async function getStaticProps(): Promise<Data> {
  const product = await fetchAPI<Product[]>(
    "http://localhost:3000/api/product"
  );
  const sliderImg = await fetchAPI<SliderImg[]>(
    "https://cyclemart.herokuapp.com/sliders"
  );

  if (product.error || sliderImg.error) {
    return {
      props: {
        error: product.error || sliderImg.error,
        netProblem: false,
        data: product.data,
        sliderImg: sliderImg.data,
      },
    };
  } else if (product.netProblem || sliderImg.netProblem) {
    return {
      props: {
        error: product.error || sliderImg.error,
        netProblem: true,
        data: product.data,
        sliderImg: sliderImg.data,
      },
    };
  } else {
    return {
      props: {
        error: null,
        netProblem: false,
        data: product.data,
        sliderImg: sliderImg.data,
      },
    };
  }
}
