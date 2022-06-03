import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchAPI } from "../../../services/shared/sharedFunction";

type Props = {
  category: string;
  setData: (prev: Product) => void;
};

const RelatedProduct = ({ category, setData }: Props) => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    (async function () {
      const products = await fetchAPI<Product[]>(
        `/api/product?category=${category}&random=true`
      );
      if (products.data) {
        setProducts(products.data);
      }
    })();
  }, [category]);

  async function handleRandomProduct(id: string) {
    const product = await fetchAPI<Product>(`/api/product?id=${id}`);
    if (product.data) {
      setData(product.data);
    }
  }

  return (
    <div className='related-product-container'>
      <h3>Related Product</h3>
      {products?.map((item) => (
        <div className='related-product' key={item._id}>
          <div className='flex items-center'>
            <Image height={80} width={80} src={item.productImg.imgUrl} alt='' />
          </div>
          <div className='col-span-2'>
            <p onClick={() => handleRandomProduct(item._id)} className='name'>
              {item.name}
            </p>
            <p className='price'>{item.price}৳</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedProduct;
