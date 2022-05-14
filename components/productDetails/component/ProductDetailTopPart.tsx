import { Button, ListItem } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useStore from "../../../contex/hooks/useStore";

const ProductDetailTopPart = ({ data }: { data: Product }) => {
  const [productImg, setProductImg] = useState<string>(data.productImg.imgUrl);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const store = useStore();

  const priceTable = [
    { heading: "Price", value: `${data.price}৳` },
    { heading: "Regular Price", value: `${data.prevPrice}৳` },
    {
      heading: "Status",
      value: `${data.stock > 0 ? "In Stock" : "Out Of Stock"}`,
    },
    { heading: "Brand", value: data.brand },
  ];

  //check is data is changed;
  useEffect(() => {
    setProductImg(data.productImg.imgUrl);
  }, [data.productImg.imgUrl]);

  return (
    <div className='product-details-top-part'>
      <div className='images'>
        <Image width={400} height={300} src={productImg} alt='' />
        <div className='gallery'>
          {data.productImgGallery.map((img, index) => (
            <div key={index} onClick={() => setProductImg(img.imgUrl)}>
              <Image width={100} height={100} src={img.imgUrl} alt='' />
            </div>
          ))}
        </div>
      </div>
      <div className='naming'>
        <h3>{data.name}</h3>
        <div className='price-table'>
          {priceTable.map((item, index) => (
            <p key={index}>
              {item.heading}:{" "}
              <span className='font-semibold'>{item.value}</span>
            </p>
          ))}
        </div>
        <div>
          <h2 className='text-xl border-b-2 mb-5 w-fit'>Key Features</h2>
          {data.keyFeatures.map((item, index) => (
            <ListItem key={index} className='pl-0'>
              {item}
            </ListItem>
          ))}
        </div>
        <div className='flex space-x-5 ml-10 mt-7 items-center'>
          <div className='counter'>
            <button
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <RemoveIcon />
            </button>
            <button>{quantity}</button>
            <button
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              <AddIcon />
            </button>
          </div>
          <Button
            onClick={() => {
              store?.State.setQuantity(quantity);
              router.push("/order");
            }}
            variant='contained'
            className='bg-mui'
          >
            buy now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTopPart;
