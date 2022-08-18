import { useState } from "react";
import Phone from "./component/phone/Phone";
import Window from "./component/window/Window";

const Header = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  return (
    <header className='header-wrapper'>
      <Window setShowCart={setShowCart} showCart={showCart} />
      <Phone setShowCart={setShowCart} showCart={showCart} />
    </header>
  );
};

export default Header;
