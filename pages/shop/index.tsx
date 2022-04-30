import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import MetaTages from "../../components/metaTags/MetaTages";
import ShopProducts from "../../components/shared/ShopProducts";
import Cart from "../../components/shared/utilitize/Cart";
import SideMenuBar from "../../components/shop/SideMenuBar";
import SideMenuInDrawer from "../../components/shop/SideMenuInDrawer";
import useStore from "../../contex/hooks/useStore";
import { fetchAPI } from "../../services/shared/sharedFunction";

const Shop = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [drawer, setDrawer] = useState<boolean>(false);
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
      <div className='shop-container'>
        <div
          onClick={() => setDrawer(!drawer)}
          className='shop-menu-icon'
        >
          <FontAwesomeIcon icon={faBars} />
        </div>

        <div className='side-menu-container hidden md:block'>
          <SideMenuBar />
        </div>
        <div className='product-wrapper'>
          <ShopProducts products={products} />
        </div>
      </div>

      <SideMenuInDrawer open={drawer} setDrawer={setDrawer} />
      <Cart />
    </>
  );
};

export default Shop;
