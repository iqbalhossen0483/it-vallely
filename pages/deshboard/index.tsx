import Customization from "../../components/deshboard/customizations/Customization";
import UpdateProduct from "../../components/deshboard/updateProduct/UpdateProduct";
import ManageProduct from "../../components/deshboard/manageProduct/ManageProduct";
import ManageOrder from "../../components/deshboard/manageOrder/ManageOrder";
import SideMenuInDrawer from "../../components/deshboard/SideMenuInDrawer";
import AddProduct from "../../components/deshboard/addProdust/AddProduct";
import ManageUser from "../../components/deshboard/manageUser/ManageUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideMenus from "../../components/deshboard/SideMenus";
import Deshboard from "../../components/deshboard/Deshboard";
import MetaTages from "../../components/metaTags/MetaTages";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const DeshboardLayout = () => {
  const [drawer, setDrawer] = useState<boolean>(false);
  const [value, setValue] = useState(0);

  const components = [
    Deshboard,
    AddProduct,
    UpdateProduct,
    ManageProduct,
    ManageOrder,
    ManageUser,
    Customization,
  ];

  return (
    <>
      <div className='deshboard-container'>
        <div onClick={() => setDrawer(!drawer)} className='shop-menu-icon'>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className='deshboard-menus'>
          <SideMenus value={value} setValue={setValue} />
        </div>
        <main>
          {components.map((Component, index) => (
            <Component key={index} index={index} value={value} />
          ))}
        </main>
        <SideMenuInDrawer
          open={drawer}
          setDrawer={setDrawer}
          value={value}
          setValue={setValue}
        />
      </div>
    </>
  );
};

export default DeshboardLayout;
