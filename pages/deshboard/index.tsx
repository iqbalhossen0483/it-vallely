import { Tab, Tabs } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const Deshboard = dynamic(
  () => import("../../components/deshboard/Deshboard")
);
const AddProduct = dynamic(
  () => import("../../components/deshboard/addProdust/AddProduct")
);
const ManageOrder = dynamic(
  import("../../components/deshboard/manageOrder/ManageOrder")
);
const ManageProduct = dynamic(
  import("../../components/deshboard/manageProduct/ManageProduct")
);
const ManageUser = dynamic(
  import("../../components/deshboard/manageUser/ManageUser")
);

const DeshboardLayout = () => {
  const [value, setValue] = useState(0);
  const menus = [
    "Deshboard",
    "Add Product",
    "Manage Products",
    "Manage Orders",
    "Manage Users",
  ];
  const components = [
    Deshboard,
    AddProduct,
    ManageOrder,
    ManageProduct,
    ManageUser,
  ];
  function handleValue(e: React.SyntheticEvent, value: number) {
    setValue(value);
  }
  return (
    <div className='deshboard-container'>
      <div className='deshboard-menus'>
        <Tabs
          value={value}
          onChange={handleValue}
          orientation='vertical'
        >
          {menus.map((menu, index) => (
            <Tab key={index} label={menu} />
          ))}
        </Tabs>
      </div>
      <main>
        {components.map((Component, index) => (
          <Component key={index} index={index} value={value} />
        ))}
      </main>
    </div>
  );
};

export default DeshboardLayout;
