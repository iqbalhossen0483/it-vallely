import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import MetaTages from "../../components/metaTags/MetaTages";
import SideMenuInDrawer from "../../components/deshboard/SideMenuInDrawer";
import SideMenus from "../../components/deshboard/SideMenus";
const Deshboard = dynamic(() => import("../../components/deshboard/Deshboard"));
const UpdateProduct = dynamic(
  () => import("../../components/deshboard/updateProduct/UpdateProduct")
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
  const [drawer, setDrawer] = useState<boolean>(false);
  const [value, setValue] = useState(0);

  const components = [
    Deshboard,
    AddProduct,
    UpdateProduct,
    ManageOrder,
    ManageProduct,
    ManageUser,
  ];

  return (
    <>
      <MetaTages />
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
