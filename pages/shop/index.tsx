import SideMenuInDrawer from "../../components/shop/SideMenuInDrawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbConnection } from "../../serverServices/services/dbConnection";
import ShopProducts from "../../components/shared/ShopProducts";
import SideMenuBar from "../../components/shop/SideMenuBar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Cart from "../../components/shared/utilitize/Cart";
import { useEffect, useState } from "react";

type Props = {
  data: Product[];
};

const Shop = ({ data }: Props) => {
  const [minMaxValue, setMinMaxValue] = useState<number[]>([0, 0]);
  const [filterBrand, setFilterBrand] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[] | []>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [value, setValue] = useState([0, 0]);

  useEffect(() => {
    setProducts(data);
    const brands: string[] = [];
    for (const product of data) {
      if (!brands.includes(product.brand)) {
        brands.push(product.brand);
      }
    }
    setBrands(brands);

    let minPrice = data[0].price;
    let maxPrice = 0;
    data.forEach((item) => {
      if (item.price > maxPrice) {
        maxPrice = item.price;
      } else if (item.price < minPrice) {
        minPrice = item.price;
      }
    });
    setMinMaxValue([minPrice, maxPrice]);
    setValue([minPrice, maxPrice]);
  }, [data]);

  function filterProducts() {
    const filtered = data?.filter(
      (item) => item.price >= value[0] && item.price <= value[1]
    );
    if (filtered) {
      if (filterBrand.length) {
        const filteredProducts: Product[] = [];
        filtered.forEach((product) => {
          if (filterBrand.includes(product.brand)) {
            filteredProducts.push(product);
          }
        });
        setProducts(filteredProducts);
      } else {
        setProducts(filtered);
      }
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
        (item) => item.price >= value[0] && item.price <= value[1]
      );
      setProducts(filtered);
    } else {
      const filtered = data.filter(
        (item) => item.price >= value[0] && item.price <= value[1]
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
            filterBrand={filterBrand}
            setFilterBrand={setFilterBrand}
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
        filterBrand={filterBrand}
        setFilterBrand={setFilterBrand}
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
    revalidate: 10,
  };
}
