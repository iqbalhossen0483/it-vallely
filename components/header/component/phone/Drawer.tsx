import ContactPageIcon from "@mui/icons-material/ContactPage";
import { Button, Collapse, SwipeableDrawer } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { FC, Fragment, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ViewListIcon from "@mui/icons-material/ViewList";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
    { name: "Home", icon: HomeIcon, href: "/" },
    { name: "Shop", icon: ShoppingCartIcon, href: "/shop" },
    {
      name: "Categories",
      icon: ViewListIcon,
      href: router.pathname,
      subMeus: store?.State.categories,
    },
    { name: "About us", icon: InfoIcon, href: "/about" },
    { name: "Contact us", icon: ContactPageIcon, href: "/contact" },
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
            <Button
              key={menu.name}
              sx={{ margin: "5px 0" }}
              onClick={() => handleClose(menu.name)}
            >
              <menu.icon />
              <Link href={menu.href}>
                <a>{menu.name}</a>
              </Link>
              {menu.subMeus && !openSubMenu && <ExpandMore />}
              {menu.subMeus && openSubMenu && <ExpandLess />}
            </Button>
            {menu.subMeus && (
              <Collapse in={openSubMenu} timeout={30} unmountOnExit>
                {menu.subMeus?.map((item: string) => (
                  <Button
                    sx={{ marginLeft: 4 }}
                    key={item}
                    onClick={() => {
                      handleClose(item);
                      router.push(`/shop/category/${item}`);
                    }}
                  >
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
