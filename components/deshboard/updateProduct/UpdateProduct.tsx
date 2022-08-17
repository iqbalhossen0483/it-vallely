import { makeDataSeperated } from "../../../clientServices/updateProduct/makeDataSeperated";
import {
  fetchAPI,
  handleError,
} from "../../../clientServices/shared/sharedFunction";
import useStore from "../../../contex/hooks/useStore";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Input from "../../shared/utilitize/Input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import {
  MakeInputDataForUpdateProduct,
  ProductInputs,
} from "../../../clientServices/updateProduct/makeInputData";

interface Props {
  value: number;
  index: number;
}

const UpdateProduct = ({ value, index }: Props) => {
  const [productInputs, setProductInputs] = useState<ProductInputs>({
    specipications: [],
    others: [],
  });
  const [product, setproduct] = useState<Product | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { handleSubmit, reset, register } = useForm<Product>();
  const router = useRouter();
  const store = useStore();

  useEffect(() => {
    (async () => {
      if (router.query.id) {
        const res = await fetchAPI<Product>(
          `/api/product?id=${router.query.id}`,
          {
            headers: {
              token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
            },
          }
        );
        if (res.data) {
          reset();
          MakeInputDataForUpdateProduct(res.data, setProductInputs);
          setproduct(res.data);
        } else {
          handleError(res, store?.State!);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id]);

  async function OnSubmit(peyLoad: Product) {
    store?.State.setLoading(true);
    const date = new Date().toISOString();
    peyLoad.created_at = new Date(date);
    const specifi = makeDataSeperated(peyLoad, productInputs?.specipications!);
    peyLoad.specifications = specifi;
    peyLoad._id = product?._id!;
    peyLoad.orderPending = product?.orderPending!;

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
    //if user want to update product image or gallery;
    if (peyLoad.pImg.length)
      formData.append("productImg", JSON.stringify(product?.productImg!));
    if (peyLoad.gImg.length)
      formData.append(
        "productImgGallery",
        JSON.stringify(product?.productImgGallery!)
      );

    putProduct(formData);
  }

  async function putProduct(peyload: FormData) {
    const token = await store?.firebase.user?.getIdToken();
    const res = await fetch(`/api/product`, {
      method: "PUT",
      headers: {
        user_uid: `${store?.firebase.user?.uid}`,
        token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
      },
      body: peyload,
    });
    const data = await res.json();
    if (res.ok) {
      if (data.modifiedCount > 0) {
        store?.State.setAlert({ msg: "Update successfull", type: "success" });
        store?.State.setUpdate((prev) => !prev);
      } else store?.State.setAlert(data.message || "No updated document found");
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
          store?.State.setAlert({ msg: "Already exist", type: "info" });
        }
      }
    }
  }

  function deleteSpecification(label: string) {
    const exist = productInputs.specipications.filter(
      (item) => item.label !== label
    );
    setProductInputs((prev) => {
      return {
        specipications: exist,
        others: prev.others,
      };
    });
  }

  if (value !== index) return null;
  return (
    <div style={{ width: "70%" }}>
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

        {productInputs && productInputs?.specipications.length
          ? productInputs?.specipications.map((item) => (
              <div key={item.label} className='specification-input-container'>
                <Input
                  {...register(item.label)}
                  defaultValue={item.defaltValue}
                  label={`${item.label}, give input like key: value | key:value`}
                  type={item.type}
                  focused
                  fullWidth
                  multiline
                  maxRows={15}
                />
                <CloseIcon onClick={() => deleteSpecification(item.label)} />
              </div>
            ))
          : null}

        {/* input for adding specification start */}
        <div className='specification-container'>
          <Input
            label='Heading'
            style={{ display: `${!showInput ? "none" : "block"}` }}
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
          defaultValue={product?.description}
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
