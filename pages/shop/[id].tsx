import useStore from "../../contex/hooks/useStore";
import { fetchAPI } from "../../services/shared/sharedFunction";
import ProductDeatails from "../../components/productDetails/ProductDeatails";

type Props = { data: Product; error: string | null; netProblem: boolean };
const ProductDetailsLeyout = ({ data, error, netProblem }: Props) => {
  const store = useStore();

  if (netProblem) {
    store?.State.setError(netProblem);
  } else if (error) {
    store?.State.setAlert(error);
  }

  return <ProductDeatails data={data} />;
};

export default ProductDetailsLeyout;

//next js functions;
export async function getStaticPaths() {
  const res = await fetchAPI<Product[]>(`http://localhost:3000/api/product`);
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
    `http://localhost:3000/api/product?id=${params.id}`
  );
  return {
    props: {
      data: res.data,
      error: res.error,
      netProblem: res.netProblem,
    },
  };
}
