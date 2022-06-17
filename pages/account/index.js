const SideMenus = lazy(() => import("../../components/deshboard/SideMenus"));
const ViewCart = lazy(() => import("../../components/account/ViewCart"));
const Profile = lazy(() => import("../../components/account/Profile"));
const MyOrder = lazy(() => import("../../components/account/MyOrder"));
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { lazy, Suspense, useEffect, useState } from "react";
const SideMenuInDrawer = lazy(() =>
  import("../../components/deshboard/SideMenuInDrawer")
);
import { useRouter } from "next/router";
import Spinner from "../../components/shared/Spinner";

const AccountLayout = () => {
  const [drawer, setDrawer] = useState(false);
  const router = useRouter();
  const [value, setValue] = useState(parseInt(router.query.c) || 0);

  const sideMenus = ["My Profile", "My Orders", "Cart Product"];
  const components = [Profile, MyOrder, ViewCart];

  useEffect(() => {
    if (value !== 2) {
      router.push("/account");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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
            <Suspense key={index} fallback={<Spinner />}>
              <Component index={index} value={value} />
            </Suspense>
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

export default AccountLayout;
