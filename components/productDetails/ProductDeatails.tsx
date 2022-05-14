import React, { useState } from "react";
import ProductDetailsDesPart from "./component/ProductDetailsDesPart";
import ProductDetailTopPart from "./component/ProductDetailTopPart";

const ProductDeatails = ({ data }: { data: Product }) => {
  const [singleProduct, setSingleProduct] = useState<Product>(data);
  return (
    <div className='bg-gray-100'>
      <ProductDetailTopPart data={singleProduct} />
      <ProductDetailsDesPart data={singleProduct} setData={setSingleProduct} />
    </div>
  );
};

export default ProductDeatails;
