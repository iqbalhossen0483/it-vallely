import { faContactBook } from "@fortawesome/free-regular-svg-icons";
import { Button, Collapse, SwipeableDrawer } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { FC, Fragment, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  faHome,
  faInfoCircle,
  faListDots,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../../contex/hooks/useStore";

interface Props {
  open: boolean;
  setDrawer: (prev: boolean) => void;
}

const Drawer: FC<Props> = ({ open, setDrawer }) => {
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);
  const router = useRouter();
  const store = useStore();

  const menus = [
    { name: "Home", icon: faHome, href: "/" },
    { name: "Shop", icon: faShoppingBag, href: "/shop" },
    {
      name: "Categories",
      icon: faListDots,
      href: router.pathname,
      subMeus: store?.State.categories,
    },
    { name: "About us", icon: faInfoCircle, href: "/about" },
    { name: "Contact us", icon: faContactBook, href: "/contact" },
  ];

  function handleClose(menu: string) {
    if (menu !== "Categories") {
      setDrawer(false);
    } else {
      setOpenSubMenu(!openSubMenu);
    }
  }
  return (
    <SwipeableDrawer
      open={open}
      anchor='left'
      onOpen={() => setDrawer(true)}
      onClose={() => setDrawer(false)}
    >
      <div className='drawer'>
        {menus.map((menu) => (
          <Fragment key={menu.name}>
            <Button key={menu.name} onClick={() => handleClose(menu.name)}>
              <FontAwesomeIcon icon={menu.icon} />
              <Link href={menu.href}>
                <a>{menu.name}</a>
              </Link>
              {menu.subMeus && !openSubMenu && <ExpandMore />}
              {menu.subMeus && openSubMenu && <ExpandLess />}
            </Button>
            {menu.subMeus && (
              <Collapse in={openSubMenu} timeout={30} unmountOnExit>
                {menu.subMeus?.map((item) => (
                  <Button key={item} onClick={() => handleClose(item)}>
                    {item}
                  </Button>
                ))}
              </Collapse>
            )}
          </Fragment>
        ))}
      </div>
    </SwipeableDrawer>
  );
};

export default Drawer;
