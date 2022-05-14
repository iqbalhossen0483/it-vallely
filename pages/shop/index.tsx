import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import MetaTages from "../../components/metaTags/MetaTages";
import ShopProducts from "../../components/shared/ShopProducts";
import Cart from "../../components/shared/utilitize/Cart";
import SideMenuBar from "../../components/shop/SideMenuBar";
import SideMenuInDrawer from "../../components/shop/SideMenuInDrawer";
import useStore from "../../contex/hooks/useStore";
import { fetchAPI } from "../../services/shared/sharedFunction";

type Props = {
  error: string | null;
  netProblem: boolean;
  data: Product[] | null;
};

const Shop = ({ data, error, netProblem }: Props) => {
  const [drawer, setDrawer] = useState<boolean>(false);
  const store = useStore();
  if (netProblem) {
    store?.State.setError(netProblem);
  } else if (error) {
    store?.State.setAlert(error);
  }
  return (
    <>
      <MetaTages />
      <div className='shop-container'>
        <div onClick={() => setDrawer(!drawer)} className='shop-menu-icon'>
          <FontAwesomeIcon icon={faBars} />
        </div>

        <div className='side-menu-container hidden md:block'>
          <SideMenuBar />
        </div>
        <div className='product-wrapper'>
          <ShopProducts products={data} />
        </div>
      </div>

      <SideMenuInDrawer open={drawer} setDrawer={setDrawer} />
      <Cart />
    </>
  );
};

export default Shop;

export async function getStaticProps() {
  const res = await fetchAPI<Product[]>("http://localhost:3000/api/product");
  return {
    props: {
      data: res.data,
      error: res.error,
      netProblem: res.netProblem,
    },
  };
}
