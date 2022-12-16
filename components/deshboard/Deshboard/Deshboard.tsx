import { Grid } from "@mui/material";
import React from "react";
import OrderInformation from "./component/OrderInformation";
import ProductInformation from "./component/ProductInformation";

const Deshboard = () => {
  return (
    <div className='flex justify-center gap-10'>
      <Grid item>
        <OrderInformation />
      </Grid>
      <Grid item>
        <ProductInformation />
      </Grid>
    </div>
  );
};

export default Deshboard;
