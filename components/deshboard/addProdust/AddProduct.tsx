import useStore from "../../../contex/hooks/useStore";
import ProductInputForm from "../../shared/ProductInputForm";
interface Props {
  value: number;
  index: number;
}

const AddProduct = ({ value, index }: Props) => {
  const store = useStore();

  async function handleSubmit(peyLoad: Product) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(peyLoad)) {
      if (key !== "pImg" && key !== "gImg") {
        formData.append(key, value);
      } else if (key === "pImg") {
        formData.append(key, value[0]);
      } else if (key === "gImg") {
        const gallery: File[] = Array.from(value);
        gallery.forEach((img) => {
          formData.append("gImg", img);
        });
      }
    }

    const res = await fetch("/api/product", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      console.log(data);
    } else {
      store?.State.setAlert(data.message);
    }
  }
  return (
    <div hidden={value !== index}>
      <ProductInputForm actionType='add' onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProduct;
