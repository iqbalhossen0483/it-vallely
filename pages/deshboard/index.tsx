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
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const DeshboardLayout = () => {
  const [drawer, setDrawer] = useState<boolean>(false);
  const router = useRouter();
  const [value, setValue] = useState(0);

  const sideMenus = [
    "Deshboard",
    "Add Product",
    "Manage Products",
    "Manage Orders",
    "Manage Users",
    "Customization",
    "",
  ];

  const components = [
    Deshboard,
    AddProduct,
    ManageProduct,
    ManageOrder,
    ManageUser,
    Customization,
    UpdateProduct,
  ];

  useEffect(() => {
    if (value !== 6) {
      if (router.query.id) {
        router.push("/deshboard");
      }
    }
  }, [router, value]);

  return (
    <>
      <div className='deshboard-container'>
        <div onClick={() => setDrawer(!drawer)} className='shop-menu-icon'>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className='deshboard-menus'>
          <SideMenus value={value} setValue={setValue} menus={sideMenus} />
        </div>
        <main>
          {components.map((Component, index) => (
            <Component
              setValue={setValue}
              key={index}
              index={index}
              value={value}
            />
          ))}
        </main>
        <SideMenuInDrawer
          open={drawer}
          setDrawer={setDrawer}
          value={value}
          setValue={setValue}
          menus={sideMenus}
        />
      </div>
    </>
  );
};

export default DeshboardLayout;
