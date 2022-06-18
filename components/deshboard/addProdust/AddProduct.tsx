import ProductInputForm from "../../shared/ProductInputForm";
import useStore from "../../../contex/hooks/useStore";
interface Props {
  value: number;
  index: number;
}

const AddProduct = ({ value, index }: Props) => {
  const store = useStore();

  async function handleSubmit(peyLoad: Product) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(peyLoad)) {
      if (key !== "pImg" && key !== "gImg" && key !== "specifications") {
        formData.append(key, value);
      } else if (key === "specifications" && key.length) {
        formData.append("specifications", JSON.stringify(value));
      } else if (key === "pImg") {
        formData.append(key, value[0]);
      } else if (key === "gImg") {
        const gallery: File[] = Array.from(value);
        gallery.forEach((img) => {
          formData.append("gImg", img);
        });
      }
    }

    const token = await store?.firebase.user?.getIdToken();
    const res = await fetch("/api/product", {
      method: "POST",
      headers: {
        user_uid: `${store?.firebase.user?.uid}`,
        token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      store?.State.setAlert("Product added successfully");
      return { error: false };
    } else {
      store?.State.setAlert(data.message || "Ops! There was an error");
      return { error: true };
    }
  }
  return (
    <div hidden={value !== index}>
      <ProductInputForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProduct;
