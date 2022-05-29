import { fetchAPI } from "../../../services/shared/sharedFunction";
import ProductInputForm from "../../shared/ProductInputForm";
import useStore from "../../../contex/hooks/useStore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
interface Props {
  value: number;
  index: number;
}
const UpdateProduct = ({ value, index }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const store = useStore();

  useEffect(() => {
    (async () => {
      if (router.query.id) {
        const res = await fetchAPI<Product>(
          `/api/product?id=${router.query.id}`
        );
        if (res.data) {
          setProduct(res.data);
        } else if (res.error) {
          store?.State.setAlert(res.error);
        } else if (res.netProblem) {
          store?.State.setError(res.netProblem);
        }
      }
    })();
  }, [router.query.id, store?.State]);

  async function handleSubmit(peyLoad: Product) {
    console.log(peyLoad);
    return { error: false };
  }
  return (
    <div hidden={value !== index}>
      <ProductInputForm
        product={product}
        actionType='update'
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UpdateProduct;
