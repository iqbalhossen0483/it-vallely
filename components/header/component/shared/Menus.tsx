import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import Link from "next/link";

const Menus = () => {
  const menus = [
    { menu_name: "Home", href: "/" },
    { menu_name: "Shop", href: "/shop" },
    { menu_name: "Contact Us", href: "/contact" },
    { menu_name: "About Us", href: "/about" },
  ];
  return (
    <>
      <div className='menus'>
        {menus.map((menu) => (
          <Button key={menu.menu_name}>
            <Link href={menu.href}>{menu.menu_name}</Link>
          </Button>
        ))}
      </div>
    </>
  );
};

export default Menus;
