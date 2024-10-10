import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import useStore from "../../../../contex/hooks/useStore";

type Props = { setShowCart: Dispatch<SetStateAction<boolean>> };

const CartProduct = ({ setShowCart }: Props) => {
  let cartElement = useRef<HTMLDivElement>(null);
  const store = useStore();
  const router = useRouter();

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (cartElement.current) {
        const isClick = cartElement.current.contains(e.target as Node | null);
        if (!isClick) {
          setShowCart(false);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                {product.name.slice(0, 28)}...
              </Link>
              <CloseIcon
                onClick={() => {
                  store?.Carts.deleteCart(product._id, product.price);
                  store?.State.setAlert({
                    msg: "Deleted successfull",
                    type: "success",
                  });
                }}
              />
            </div>
          ))}
          <Button
            onClick={() => router.push("/account?c=2")}
            className='bg-mui'
            sx={{ marginTop: "1rem" }}
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
