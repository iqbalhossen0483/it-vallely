import Image from "next/image";
import React from "react";
import useStore from "../../contex/hooks/useStore";
import { fetchAPI } from "../../services/shared/sharedFunction";

type Props = { data: Product; error: string | null; netProblem: boolean };
const ProductDetails = ({ data, error, netProblem }: Props) => {
  const store = useStore();
  if (netProblem) {
    store?.State.setError(netProblem);
  } else if (error) {
    store?.State.setAlert(error);
  }
  return (
    <div>
      <p>ProductDetails</p>
      <Image width={400} height={300} src={data.productImg.imgUrl} alt='' />
      <p>{data.name}</p>
    </div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const res = await fetchAPI<Product[]>(
    `https://cyclemart.herokuapp.com/products`
  );
  if (!res.error || !res.netProblem) {
    const paths = res.data?.map((item) => {
      return {
        params: {
          id: item._id,
        },
      };
    });
    return {
      paths,
      fallback: false,
    };
  }
}

type Context = { params: { id: string } };
export async function getStaticProps(contex: Context) {
  const { params } = contex;
  const res = await fetchAPI<Product>(
    `https://cyclemart.herokuapp.com/products/${params.id}`
  );
  return {
    props: {
      data: res.data,
      error: res.error,
      netProblem: res.netProblem,
    },
  };
}
