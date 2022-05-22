import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import MetaTages from "../../components/metaTags/MetaTages";
import ShopProducts from "../../components/shared/ShopProducts";
import Cart from "../../components/shared/utilitize/Cart";
import SideMenuBar from "../../components/shop/SideMenuBar";
import SideMenuInDrawer from "../../components/shop/SideMenuInDrawer";
import { dbConnection } from "../../util/services/dbConnection";

type Props = {
  products: Product[];
};

const Shop = ({ products }: Props) => {
  const [drawer, setDrawer] = useState<boolean>(false);
  const [filterPrice, setFilterPrice] = useState<number[] | null>(null);

  useEffect(() => {
    let minPrice = parseInt(products[0].price);
    let maxPrice = 0;
    products.forEach((item) => {
      if (parseInt(item.price) > maxPrice) {
        maxPrice = parseInt(item.price);
      } else if (parseInt(item.price) < minPrice) {
        minPrice = parseInt(item.price);
      }
    });
    setFilterPrice([minPrice, maxPrice]);
  }, [products]);

  return (
    <>
      <MetaTages />
      <div className='shop-container'>
        <div onClick={() => setDrawer(!drawer)} className='shop-menu-icon'>
          <FontAwesomeIcon icon={faBars} />
        </div>

        <div className='side-menu-container hidden md:block'>
          <SideMenuBar
            filterPrice={filterPrice}
            setFilterPrice={setFilterPrice}
          />
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

export async function getStaticProps() {
  const db = await dbConnection();
  const productsCollection = db.collection("products");
  const products: any = await productsCollection.find().toArray();
  const parsedProducts = JSON.parse(JSON.stringify(products));

  return {
    props: {
      products: parsedProducts,
    },
  };
}
