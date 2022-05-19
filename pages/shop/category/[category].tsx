import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ShopProducts from "../../../components/shared/ShopProducts";
import Spinner from "../../../components/shared/utilitize/Spinner";
import useStore from "../../../contex/hooks/useStore";
import { fetchAPI } from "../../../services/shared/sharedFunction";

const Category = () => {
  const [product, setProduct] = useState<Product[] | null>(null);
  const router = useRouter();
  const store = useStore();
  const { category } = router.query;

  useEffect(() => {
    (async function () {
      store?.State.setLoading(true);
      const res = await fetchAPI<Product[]>(
        `/api/product?category=${category}&random=false`
      );
      if (res.data && res.data.length) {
        setProduct(res.data);
      } else if (res.netProblem) {
        store?.State.setError(res.netProblem);
      } else if (res.error) {
        store?.State.setAlert(res.error);
      }
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
        <div className='flex justify-center items-center h-[50vh] text-xl text-gray-400'>
          <p>There is no product available</p>
        </div>
      )}
    </>
  );
};

export default Category;
