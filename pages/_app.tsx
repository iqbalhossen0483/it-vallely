import ScrollTop from "../components/shared/utilitize/ScrollTop";
import Header from "../components/header/Header";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";
import "../styles/header.css";
import "../styles/footer.css";
import "../styles/loginRegister.css";
import "../styles/home.css";
import "../styles/shop.css";
import "../styles/product.css";
import "../styles/utilitize.css";
import "../styles/alert.css";
import Footer from "../components/footer/Footer";
import StoreProvider from "../contex/providers/StoreProvider";
import Alert from "../components/alert/Alert";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <StoreProvider>
        <Header />
        <Component {...pageProps} />
        <ScrollTop />
        <Footer />
        <Alert />
      </StoreProvider>
    </>
  );
}

export default MyApp;
