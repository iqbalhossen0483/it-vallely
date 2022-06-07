import { useEffect, useState } from "react";
import { fetchAPI } from "../../services/shared/sharedFunction";
import { cartProduct, CartReturnType } from "../contex-type";

type CartFnReturn = { message: "added" | "success" };

function Cart(): CartReturnType {
  const [update, setUpdate] = useState(false);
  const [cartProduct, setCartProduct] = useState<cartProduct>({
    quantity: 0,
    products: null,
    price: 0,
  });

  //get all cart id in every render from localstorage;
  useEffect(() => {
    const cart: string | null = localStorage.getItem("cart");
    if (cart) {
      const cartProducts: Cart[] = JSON.parse(cart);
      if (cartProducts.length) {
        let productId: string = "";

        let price = 0;
        for (const item of cartProducts) {
          if (!productId) {
            productId = `${item.productId}`;
          } else {
            productId += `|${item.productId}`;
          }
        }

        (async () => {
          const res = await fetchAPI<Product[]>(
            `/api/product?id=${productId}&multipleId=true`
          );
          if (res.data) {
            const products: OrderedProducts[] = [];
            for (const item of res.data) {
              for (const cart of cartProducts) {
                if (cart.productId === item._id) {
                  item.quantity = parseInt(cart.quantity);
                }
              }
              price += item.price;
              const product: OrderedProducts = {
                _id: item._id,
                quantity: 1,
                productImg: { imgUrl: item.productImg.imgUrl },
                name: item.name,
                price: item.price,
                productCode: item.productCode,
              };
              products.push(product);
            }

            setCartProduct(() => {
              return {
                quantity: cartProducts.length,
                products,
                price,
              };
            });
          } else {
            setCartProduct(() => {
              return {
                quantity: 0,
                products: null,
                price: 0,
              };
            });
          }
        })();
      }
    }
  }, [cartProduct.quantity, update]); //till

  //add cart id to localstorage;
  function Add(productId: string, price: number): CartFnReturn {
    const isExistedCart: string | null = localStorage.getItem("cart");
    if (isExistedCart) {
      const cart: Cart[] = JSON.parse(isExistedCart);
      const isExistProduct = cart.find((item) => item.productId === productId);
      if (!isExistProduct) {
        cart.push({ productId, price, quantity: "1" });
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        return { message: "added" };
      }
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ productId, price, quantity: "1" }])
      );
    }
    setUpdate(!update);
    return { message: "success" };
  }

  function updateCart(id: string, quantity: string) {
    const cart: string | null = localStorage.getItem("cart");
    if (cart) {
      const cartProducts: Cart[] = JSON.parse(cart);
      const findTarget = cartProducts?.find((item) => item.productId === id);
      if (findTarget) {
        findTarget.quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cartProducts));
      }
    }
  }

  function deleteCart(id: string, price: number) {
    const cart: string | null = localStorage.getItem("cart");
    if (cart) {
      const cartProducts: Cart[] = JSON.parse(cart);
      const remain = cartProducts.filter((item) => item.productId !== id);
      localStorage.setItem("cart", JSON.stringify(remain));

      const remainingProduct = cartProduct.products?.filter(
        (item) => item._id !== id
      );
      setCartProduct((prev) => {
        return {
          quantity: prev.quantity - 1,
          products: remainingProduct || null,
          price: prev.price - price,
        };
      });
      setUpdate(!update);
    }
    return;
  }

  return {
    cartProduct,
    setCartProduct,
    Add,
    deleteCart,
    updateCart,
  };
}

export default Cart;
