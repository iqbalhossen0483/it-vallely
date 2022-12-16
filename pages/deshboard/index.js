import React, { lazy, useEffect, useState } from "react";
import SideMenus from "../../components/deshboard/SideMenus";
import Deshboard from "../../components/deshboard/Deshboard/Deshboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useRouter } from "next/router";
import AddProduct from "../../components/deshboard/addProdust/AddProduct";
import ManageProduct from "../../components/deshboard/manageProduct/ManageProduct";
import ManageOrder from "../../components/deshboard/manageOrder/ManageOrder";
import ManageUser from "../../components/deshboard/manageUser/ManageUser";
import Customization from "../../components/deshboard/customizations/Customization";
import UpdateProduct from "../../components/deshboard/updateProduct/UpdateProduct";
const SideMenuInDrawer = lazy(() =>
  import("../../components/deshboard/SideMenuInDrawer")
);

const DeshboardLayout = () => {
  const [drawer, setDrawer] = useState(false);
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
          <FormatListBulletedIcon />
        </div>
        <div className='deshboard-menus'>
          <SideMenus value={value} setValue={setValue} menus={sideMenus} />
        </div>
        <main>
          {value === 0 && <Deshboard />}
          {value === 1 && <AddProduct />}
          {value === 2 && <ManageProduct setValue={setValue} />}
          {value === 3 && <ManageOrder />}
          {value === 4 && <ManageUser />}
          {value === 5 && <Customization />}
          {value === 6 && <UpdateProduct />}
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
