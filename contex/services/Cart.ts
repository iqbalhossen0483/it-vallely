import { useEffect, useState } from "react";

type CartFnReturn = { message: "added" | "success" };

function Cart(): CartReturnType {
  const [cartProduct, setCartProduct] = useState<cartProduct>({
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    const cart: string | null = localStorage.getItem("cart");
    if (cart) {
      const cartProducts: Cart[] = JSON.parse(cart);
      let price = 0;
      for (const item of cartProducts) {
        price += item.price;
      }
      setCartProduct({ quantity: cartProducts.length, price });
    }
  }, []);

  function Add(productId: string, price: number): CartFnReturn {
    const isExistedCart: string | null = localStorage.getItem("cart");
    if (isExistedCart) {
      const cart: Cart[] = JSON.parse(isExistedCart);
      const isExistProduct = cart.find(
        (item) => item.productId === productId
      );
      if (!isExistProduct) {
        cart.push({ productId, price });
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        return { message: "added" };
      }
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ productId, price }])
      );
    }
    return { message: "success" };
  }

  return {
    cartProduct,
    setCartProduct,
    Add,
  };
}

export default Cart;
