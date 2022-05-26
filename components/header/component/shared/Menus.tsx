import { Button } from "@mui/material";
import { useRouter } from "next/router";

const Menus = () => {
  const Router = useRouter();
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
          <Button onClick={() => Router.push(menu.href)} key={menu.menu_name}>
            {menu.menu_name}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Menus;
