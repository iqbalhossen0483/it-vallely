import { useState } from "react";
import ProductDetailsDesPart from "./component/ProductDetailsDesPart";
import ProductDetailTopPart from "./component/ProductDetailTopPart";

const ProductDeatails = ({ data }: { data: Product }) => {
  const [singleProduct, setSingleProduct] = useState<Product>(data);
  
  if (!data) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <p>No Contend</p>
      </div>
    );
  }
  return (
    <div className='bg-gray-100'>
      <ProductDetailTopPart data={singleProduct} />
      <ProductDetailsDesPart data={singleProduct} setData={setSingleProduct} />
    </div>
  );
};

export default ProductDeatails;
