import SideMenuInDrawer from "../../components/shop/SideMenuInDrawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbConnection } from "../../util/services/dbConnection";
import ShopProducts from "../../components/shared/ShopProducts";
import SideMenuBar from "../../components/shop/SideMenuBar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Cart from "../../components/shared/utilitize/Cart";
import { useEffect, useState } from "react";

type Props = {
  data: Product[];
};

const Shop = ({ data }: Props) => {
  const [minMaxValue, setMinMaxValue] = useState<number[]>([0, 500]);
  const [products, setProducts] = useState<Product[] | []>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [value, setValue] = useState([0, 500]);

  useEffect(() => {
    setProducts(data);
    const brands: string[] = [];
    for (const product of data) {
      if (!brands.includes(product.brand)) {
        brands.push(product.brand);
      }
    }
    setBrands(brands);
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
    const filtered = data?.filter(
      (item) =>
        parseInt(item.price) >= value[0] && parseInt(item.price) <= value[1]
    );
    if (filtered) {
      setProducts(filtered);
    } else {
      setProducts([]);
    }
  }

  function filterBrandProducts(brands: string[]) {
    if (brands.length) {
      const filteredProducts: Product[] = [];
      data.forEach((product) => {
        if (brands.includes(product.brand)) {
          filteredProducts.push(product);
        }
      });
      const filtered = filteredProducts.filter(
        (item) =>
          parseInt(item.price) >= value[0] && parseInt(item.price) <= value[1]
      );
      setProducts(filtered);
    } else {
      const filtered = data.filter(
        (item) =>
          parseInt(item.price) >= value[0] && parseInt(item.price) <= value[1]
      );
      setProducts(filtered);
    }
  }

  return (
    <>
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
            filterBrandProducts={filterBrandProducts}
            brands={brands}
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

      <SideMenuInDrawer
        open={drawer}
        setDrawer={setDrawer}
        minMaxValue={minMaxValue}
        value={value}
        setValue={setValue}
        filterProducts={filterProducts}
        filterBrandProducts={filterBrandProducts}
        brands={brands}
      />
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
