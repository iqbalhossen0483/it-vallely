import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAPI } from "../../../clientServices/shared/sharedFunction";

type Props = {
  category: string;
  setData: (prev: Product) => void;
};

const RelatedProduct = ({ category }: Props) => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    (async function () {
      const products = await fetchAPI<Product[]>(
        `/api/product?category=${category}&random=true`,
        {
          headers: {
            token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
          },
        }
      );
      if (products.data) {
        setProducts(products.data);
      }
    })();
  }, [category]);

  return (
    <div className='related-product-container'>
      <h3>Related Product</h3>
      {products?.map((item) => (
        <div className='related-product' key={item._id}>
          <div className='flex items-center'>
            <Image height={80} width={80} src={item.productImg.imgUrl} alt='' />
          </div>
          <div className='col-span-2'>
            <p className='name'>
              <Link href={`/shop/${item._id}`}>{item.name}</Link>
            </p>
            <p className='price'>{item.price}৳</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedProduct;
