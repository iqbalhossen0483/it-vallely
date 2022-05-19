import Image from "next/image";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import React, { Dispatch, SetStateAction, useRef } from "react";
import useStore from "../../../../contex/hooks/useStore";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

type Props = { setShowCart: Dispatch<SetStateAction<boolean>> };

const CartProduct = ({ setShowCart }: Props) => {
  let cartElement = useRef<HTMLDivElement>(null);
  const store = useStore();
  const router = useRouter();

  document.addEventListener("click", (e) => {
    if (cartElement.current) {
      const isClick = cartElement.current.contains(e.target as Node | null);
      if (!isClick) {
        setShowCart(false);
      }
    }
  });

  return (
    <div ref={cartElement} className='cart-product-container'>
      <div className='nose'></div>
      {store?.Carts.cartProduct.products &&
      store?.Carts.cartProduct.products.length ? (
        <>
          {store?.Carts.cartProduct.products.map((product) => (
            <div className='product-wrapper' key={product._id}>
              <Image
                height={70}
                width={70}
                src={product.productImg.imgUrl}
                alt=''
              />
              <Link href={`/shop/${product._id}`}>
                <a>{product.name.slice(0, 28)}...</a>
              </Link>
              <CloseIcon
                onClick={() => {
                  store?.Carts.deleteCart(product._id, parseInt(product.price));
                  store?.State.setAlert("Deleted successfull");
                }}
              />
            </div>
          ))}
          <Button
            onClick={() => router.push("/account/viewcart")}
            className='bg-mui mt-4'
            variant='contained'
          >
            View cart
          </Button>
        </>
      ) : (
        <p>No Product Added</p>
      )}
    </div>
  );
};

export default CartProduct;
