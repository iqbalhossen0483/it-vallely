import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import useStore from "../../contex/hooks/useStore";

type Props = { products: Product[] | null };

const ShopProducts: FC<Props> = ({ products }) => {
  const store = useStore();
  const router = useRouter();

  function handlecartProduct(id: string, price: number) {
    const isAdded = store?.Carts.Add(id, price);
    if (isAdded.message === "success") {
      store?.Carts.setCartProduct({
        quantity: store.Carts.cartProduct.quantity + 1,
        price: store.Carts.cartProduct.price + price,
      });
      store?.State.setAlert("Product successfully added");
    } else if (isAdded.message === "added") {
      store?.State.setAlert("Product already added");
    }
  }
  return (
    <>
      {products &&
        products.map((product) => (
          <div className='product' key={product._id}>
            <Image
              width={275}
              height={200}
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
            <div className='btn-group'>
              <Button
                onClick={() =>
                  handlecartProduct(product._id, parseInt(product.price))
                }
                variant='contained'
              >
                add to cart
              </Button>
              <Button onClick={() => router.push("/order")} variant='contained'>
                buy now
              </Button>
            </div>
          </div>
        ))}
    </>
  );
};

export default ShopProducts;
