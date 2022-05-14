import { Button } from "@mui/material";
import RelatedProduct from "./RelatedProduct";

const ProductDetailsDesPart = ({ data, setData }) => {
  return (
    <div className='product-details-des-part'>
      <div className='col-span-3'>
        <div className='btn-group'>
          <Button variant='contained' className='bg-mui'>
            Specification
          </Button>
          <Button variant='outlined'>
            <a href='#description'>Description</a>
          </Button>
        </div>
        <div className='specification'>
          <h3>Specification</h3>
          {data.specifications.map((item, index) => (
            <div key={index}>
              <h4>{item.header}</h4>
              {Object.entries(item).map((feature, index) => {
                if (feature[0] === "header") {
                  return null;
                } else {
                  return (
                    <div className='features' key={index}>
                      <p>{feature[0]}</p>
                      <p className='col-span-3'>{feature[1]}</p>
                    </div>
                  );
                }
              })}
            </div>
          ))}
        </div>
        <div id='description'>
          <h3>Description</h3>
          <h3 className='mt-6'>{data.name}</h3>
          <p>{data.description}</p>
        </div>
      </div>
      <RelatedProduct category={data.category} setData={setData} />
    </div>
  );
};

export default ProductDetailsDesPart;
