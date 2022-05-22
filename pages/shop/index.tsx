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
  data: Product[];
};

const Shop = ({ data }: Props) => {
  const [minMaxValue, setMinMaxValue] = useState<number[]>([0, 500]);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [value, setValue] = useState([0, 500]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    let minPrice = parseInt(data[0].price);
    let maxPrice = 0;
    data.forEach((item) => {
      if (parseInt(item.price) > maxPrice) {
        maxPrice = parseInt(item.price);
      } else if (parseInt(item.price) < minPrice) {
        minPrice = parseInt(item.price);
      }
    });
    setMinMaxValue([minPrice, maxPrice]);
    setValue([minPrice, maxPrice]);
  }, [data]);

  function filterProducts() {
    const filterd = data?.filter(
      (item) =>
        parseInt(item.price) >= value[0] && parseInt(item.price) <= value[1]
    );
    if (filterd) {
      setProducts(filterd);
    } else {
      setProducts(null);
    }
  }

  return (
    <>
      <MetaTages />
      <div className='shop-container'>
        <div onClick={() => setDrawer(!drawer)} className='shop-menu-icon'>
          <FontAwesomeIcon icon={faBars} />
        </div>

        <div className='side-menu-container hidden md:block'>
          <SideMenuBar
            minMaxValue={minMaxValue}
            value={value}
            setValue={setValue}
            filterProducts={filterProducts}
          />
        </div>
        <div className='product-wrapper'>
          {products?.length ? (
            <ShopProducts products={products} />
          ) : (
            <div className='no-product'>
              <p>There is no product</p>
            </div>
          )}
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
      data: parsedProducts,
    },
  };
}
