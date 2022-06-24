import { StatesReturnType } from "../../contex/contex-type";
import { fetchAPI, handleError } from "../shared/sharedFunction";

export async function initialFn(
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>,
  setCategories: React.Dispatch<React.SetStateAction<string[]>>,
  state: StatesReturnType
) {
  const res = await fetchAPI<Product[]>("/api/product", {
    headers: {
      token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
    },
  });
  if (res.data) {
    setProducts(res.data);
    const categories = ["All"];
    res.data.forEach((product) => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
    setCategories(categories);
  } else {
    handleError(res, state!);
  }
}
