import { StoreReturnType } from "../../contex/store/Store";

type IMG = { imgId: string; imgUrl: string };
export type Params = { id: string; productImg: IMG; galleryImg: IMG[] };

export async function deleteProduct(
  peyload: Params,
  store: StoreReturnType | null,
  products: Product[] | null,
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>
) {
  const confirm = window.confirm("Are you sure to delete this product");
  if (confirm) {
    const { id, productImg, galleryImg } = peyload;
    const token = await store?.firebase.user?.getIdToken();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("productImg", JSON.stringify(productImg));
    formData.append("galleryImg", JSON.stringify(galleryImg));

    const res = await fetch("/api/product", {
      method: "DELETE",
      headers: {
        user_uid: `${store?.firebase.user?.uid}`,
        token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      store?.State.setAlert({ msg: "Deleted successfull", type: "success" });
      const exist = products?.filter((item) => item._id !== id);
      setProducts(exist!);
    } else {
      store?.State.setAlert(data.message);
    }
  }
}
