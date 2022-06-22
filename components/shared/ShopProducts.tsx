import CircleIcon from "@mui/icons-material/Circle";
import useStore from "../../contex/hooks/useStore";
import { Button, ListItem } from "@mui/material";
import { useRouter } from "next/router";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = { products: Product[] | null };

const ShopProducts: FC<Props> = ({ products }) => {
  const store = useStore();
  const router = useRouter();

  function handlecartProduct(id: string, price: number) {
    const isAdded = store?.Carts.Add(id, price);
    if (isAdded.message === "success") {
      store?.Carts.setCartProduct((prev) => {
        return {
          quantity: store.Carts.cartProduct.quantity + 1,
          price: store.Carts.cartProduct.price + price,
          products: prev.products,
        };
      });
      store?.State.setAlert({
        msg: "Product successfully added",
        type: "success",
      });
    } else if (isAdded.message === "added") {
      store?.State.setAlert({ msg: "Product already added", type: "info" });
    }
  }
  return (
    <>
      {products &&
        products.length &&
        products.map((product) => (
          <div className='product' key={product._id}>
            <Image
              width={375}
              height={350}
              priority={true}
              src={product.productImg.imgUrl}
              alt=''
            />
            <div className='name'>
              <Link href={`/shop/${product._id}`}>
                <a>{product.name}</a>
              </Link>
            </div>
            <div className='price'>
              <p className='curren'>
                {product.price} <span>৳</span>
              </p>
              <p className='prev-price'>
                {product.prevPrice ? (
                  <>
                    {product.prevPrice} <span>৳</span>
                  </>
                ) : null}
              </p>
            </div>
            {router.pathname !== "/" && (
              <div className='key-features'>
                {product.keyFeatures.slice(0, 4).map((item, index) => (
                  <ListItem className='text-sm py-1' key={index}>
                    <CircleIcon />
                    {item}
                  </ListItem>
                ))}
              </div>
            )}
            <div className='btn-group'>
              <Button
                onClick={() => handlecartProduct(product._id, product.price)}
                variant='contained'
              >
                add to cart
              </Button>
              <Button
                onClick={() =>
                  router.push(`/checkout?productId=${product._id}`)
                }
                variant='contained'
              >
                buy now
              </Button>
            </div>
          </div>
        ))}
    </>
  );
};

export default ShopProducts;
