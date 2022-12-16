import React from "react";

const ProductInformation = () => {
  return (
    <div className='dashboard-items-container'>
      <h3>Products Information</h3>
      <div>
        <p>Total Products:</p>
        <p>0</p>
      </div>
      <div className='bg-green-200'>
        <p>High Pending Ordered Products:</p>
        <p>0</p>
      </div>
      <div className='bg-red-300'>
        <p>Low Stock Products:</p>
        <p>0</p>
      </div>
    </div>
  );
};

export default ProductInformation;
