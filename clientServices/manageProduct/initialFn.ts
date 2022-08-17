import { ProductAPI } from "../../components/deshboard/manageProduct/ManageProduct";
import { StatesReturnType } from "../../contex/contex-type";
import { fetchAPI, handleError } from "../shared/sharedFunction";

export async function initialFn(
  setProducts: React.Dispatch<React.SetStateAction<ProductAPI>>,
  setCategories: React.Dispatch<React.SetStateAction<string[]>>,
  state: StatesReturnType,
  page: number
) {
  const res = await fetchAPI<ProductAPI>(`/api/product?page=${page}`, {
    headers: {
      token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
    },
  });
  if (res.data) {
    setProducts(res.data);
    const categories = ["All"];
    res.data.data?.forEach((product) => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
    setCategories(categories);
  } else {
    handleError(res, state!);
  }
}
