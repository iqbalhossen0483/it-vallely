import {
  fetchAPI,
  handleError,
} from "../../../clientServices/shared/sharedFunction";
import Spinner from "../../../components/shared/utilitize/Spinner";
import ShopProducts from "../../../components/shared/ShopProducts";
import useStore from "../../../contex/hooks/useStore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Category = () => {
  const [product, setProduct] = useState<Product[] | null>(null);
  const router = useRouter();
  const store = useStore();
  const { category } = router.query;

  useEffect(() => {
    (async function () {
      store?.State.setLoading(true);
      const res = await fetchAPI<Product[]>(
        `/api/product?category=${category}&random=false`,
        {
          headers: {
            token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
          },
        }
      );
      if (res.data && res.data.length) {
        setProduct(res.data);
      } else handleError(res, store?.State!);
      store?.State.setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  if (store?.State.loading) {
    return <Spinner />;
  }
  return (
    <>
      {product ? (
        <div className='category-product-wrapper'>
          <ShopProducts products={product} />
        </div>
      ) : (
        <div className='empty-message'>
          <p>There is no product available</p>
        </div>
      )}
    </>
  );
};

export default Category;
