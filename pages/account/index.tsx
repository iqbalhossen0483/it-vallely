import SideMenuInDrawer from "../../components/deshboard/SideMenuInDrawer";
import ViewCart from "../../components/account/ViewCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideMenus from "../../components/deshboard/SideMenus";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Profile from "../../components/account/Profile";
import MyOrder from "../../components/account/MyOrder";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useStore from "../../contex/hooks/useStore";

const AccountLayout = () => {
  const [drawer, setDrawer] = useState<boolean>(false);
  const router = useRouter();
  const [value, setValue] = useState(parseInt(router.query.c as string) || 0);

  const sideMenus = ["My Profile", "My Orders", "Cart Product"];
  const components = [Profile, MyOrder, ViewCart];

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
            <Component key={index} index={index} value={value} />
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
