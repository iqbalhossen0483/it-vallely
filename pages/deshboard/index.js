import React, { lazy, Suspense, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideMenus from "../../components/deshboard/SideMenus";
import Deshboard from "../../components/deshboard/Deshboard";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
const Customization = lazy(() =>
  import("../../components/deshboard/customizations/Customization")
);
import Spinner from "../../components/shared/utilitize/Spinner";
const UpdateProduct = lazy(() =>
  import("../../components/deshboard/updateProduct/UpdateProduct")
);
const ManageProduct = lazy(() =>
  import("../../components/deshboard/manageProduct/ManageProduct")
);
const ManageOrder = lazy(() =>
  import("../../components/deshboard/manageOrder/ManageOrder")
);
const SideMenuInDrawer = lazy(() =>
  import("../../components/deshboard/SideMenuInDrawer")
);
const AddProduct = lazy(() =>
  import("../../components/deshboard/addProdust/AddProduct")
);
const ManageUser = lazy(() =>
  import("../../components/deshboard/manageUser/ManageUser")
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
              key={index}
              setValue={setValue}
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
