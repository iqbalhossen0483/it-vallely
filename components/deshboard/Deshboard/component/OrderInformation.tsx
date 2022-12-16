import { Tooltip } from "@mui/material";
import React from "react";

const OrderInformation = () => {
  return (
    <div className='dashboard-items-container'>
      <h3>Order Information</h3>
      <div>
        <p>Total Orders:</p>
        <p>0</p>
      </div>
      <Tooltip title='Pending for your Approval'>
        <div className='bg-green-200'>
          <p>Pending Orders:</p>
          <p>0</p>
        </div>
      </Tooltip>
      <Tooltip title='Waiting for Delivary'>
        <div className='bg-green-300'>
          <p>Approved Orders:</p>
          <p>0</p>
        </div>
      </Tooltip>
      <div className='bg-green-400'>
        <p>Delivered Orders:</p>
        <p>0</p>
      </div>
      <div className='bg-red-300 rounded-b'>
        <p>Canceled Orders:</p>
        <p>0</p>
      </div>
    </div>
  );
};

export default OrderInformation;
