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
import { dbConnection } from "../../util/services/dbConnection";

type Props = {
  products: any;
};

const Shop = ({ products }: Props) => {
  const [drawer, setDrawer] = useState<boolean>(false);
  const parsedProducts = JSON.parse(products);

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
          <ShopProducts products={parsedProducts} />
        </div>
      </div>

      <SideMenuInDrawer open={drawer} setDrawer={setDrawer} />
      <Cart />
    </>
  );
};

export default Shop;

export async function getStaticProps() {
  const db = await dbConnection();
  const productsCollection = db.collection("products");
  const products: any = await productsCollection.find().toArray();
  const parsedProducts = JSON.stringify(products);

  return {
    props: {
      products: parsedProducts,
    },
  };
}
