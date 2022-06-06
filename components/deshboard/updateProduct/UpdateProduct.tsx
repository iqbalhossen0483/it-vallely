import { makeDataSeperated } from "../../../services/updateProduct/makeDataSeperated";
import { fetchAPI } from "../../../services/shared/sharedFunction";
import useStore from "../../../contex/hooks/useStore";
import React, { useEffect, useState } from "react";
import Input from "../../shared/utilitize/Input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import {
  MakeInputDataForUpdateProduct,
  ProductInputs,
} from "../../../services/updateProduct/makeInputData";

interface Props {
  value: number;
  index: number;
}
type Rest = { _id: string; orderPending: number; description: string };

const UpdateProduct = ({ value, index }: Props) => {
  const [productInputs, setProductInputs] = useState<ProductInputs>({
    specipications: [],
    others: [],
  });
  const [restData, setRestData] = useState<Rest | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { handleSubmit, reset, register } = useForm<Product>();
  const router = useRouter();
  const store = useStore();

  useEffect(() => {
    (async () => {
      if (router.query.id) {
        const res = await fetchAPI<Product>(
          `/api/product?id=${router.query.id}`
        );
        if (res.data) {
          reset();
          MakeInputDataForUpdateProduct(res.data, setProductInputs);
          setRestData({
            _id: res.data._id,
            orderPending: res.data.orderPending,
            description: res.data.description,
          });
        } else if (res.error) {
          store?.State.setAlert(res.error);
        } else {
          store?.State.setError(res.netProblem);
        }
      }
    })();
  }, [reset, router.query.id, store]);

  async function OnSubmit(peyLoad: Product) {
    store?.State.setLoading(true);
    const specifi = makeDataSeperated(peyLoad, productInputs?.specipications!);
    peyLoad.specifications = specifi;
    peyLoad._id = restData?._id!;
    peyLoad.orderPending = restData?.orderPending!;

    const formData = new FormData();
    for (const [key, value] of Object.entries(peyLoad)) {
      if (key !== "pImg" && key !== "gImg" && key !== "specifications") {
        formData.append(key, value);
      } else if (key === "specifications" && key.length) {
        formData.append("specifications", JSON.stringify(value));
      } else if (key === "pImg" && value.length) {
        formData.append(key, value[0]);
      } else if (key === "gImg" && value.length) {
        const gallery: File[] = Array.from(value);
        gallery.forEach((img) => {
          formData.append("gImg", img);
        });
      }
    }
    putProduct(formData);
  }

  async function putProduct(peyload: FormData) {
    const res = await fetch(`/api/product`, {
      method: "PUT",
      body: peyload,
    });
    const data = await res.json();
    if (res.ok) {
      if (data.modifiedCount > 0) {
        store?.State.setAlert("Update successfull");
      } else store?.State.setAlert("No updated document found");
    } else {
      store?.State.setAlert(data.message);
    }
    store?.State.setLoading(false);
  }

  function addSpecifications(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.length > 0) {
        const isExist = productInputs.specipications.find(
          (item) => item.label === inputValue
        );
        if (!isExist) {
          setProductInputs((prev) => {
            return {
              specipications: [
                ...prev.specipications,
                { label: inputValue, type: "text", defaltValue: "" },
              ],
              others: prev?.others,
            };
          });
          setInputValue("");
          setShowInput(false);
        } else {
          store?.State.setAlert("Already exist");
        }
      }
    }
  }

  return (
    <div hidden={value !== index} style={{ width: "70%" }}>
      <form
        onSubmit={handleSubmit(OnSubmit)}
        className='product-input-form-container'
      >
        {productInputs &&
          productInputs?.others.length &&
          productInputs?.others.map((inputValue, index) => (
            <Input
              key={index}
              {...register(inputValue.label)}
              defaultValue={inputValue.defaltValue}
              label={`${inputValue.label} ${
                inputValue.label === "tags" ||
                inputValue.label === "keyFeatures"
                  ? ", give input like key: value | key:value"
                  : ""
              }`}
              className={`${
                (inputValue.label === "name" ||
                  inputValue.label === "tags" ||
                  inputValue.label === "keyFeatures") &&
                "col-span-2"
              }`}
              type={inputValue.type}
              focused
              fullWidth
              multiline
              maxRows={5}
            />
          ))}
        <input
          {...register("pImg")}
          className='file'
          type='file'
          accept='image/*'
        />
        <input
          {...register("gImg")}
          type='file'
          className='file'
          multiple
          max={3}
          accept='image/*'
        />

        {productInputs &&
          productInputs?.specipications.length &&
          productInputs?.specipications.map((item) => (
            <Input
              key={item.label}
              {...register(item.label)}
              defaultValue={item.defaltValue}
              className='col-span-2'
              label={`${item.label}, give input like key: value | key:value`}
              type={item.type}
              focused
              fullWidth
              multiline
              maxRows={15}
            />
          ))}

        {/* input for adding specification start */}
        <div className='specification-container'>
          <Input
            hidden={!showInput}
            label='Heading'
            className='specipication-input'
            value={inputValue}
            onKeyDown={(e) => addSpecifications(e)}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            type='button'
            onClick={() => setShowInput((prev) => !prev)}
            variant='outlined'
          >
            More Features
          </Button>
        </div>
        {/* input for adding specification end */}

        <Input
          {...register("description")}
          defaultValue={restData?.description}
          className='col-span-2'
          label='Description'
          type='text'
          focused
          fullWidth
          multiline
          maxRows={15}
        />
        <Button
          type='submit'
          disabled={store?.State.loading}
          variant='contained'
          className='submit-btn'
        >
          update product
        </Button>
      </form>
    </div>
  );
};

export default UpdateProduct;
