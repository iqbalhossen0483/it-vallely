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
import "../styles/deshboard.css";
import Footer from "../components/footer/Footer";
import StoreProvider from "../contex/providers/StoreProvider";
import Alert from "../components/alert/Alert";
import useStore from "../contex/hooks/useStore";
import Error from "../components/error/Error";
import { NextComponentType, NextPageContext } from "next";

function Layout({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}) {
  const store = useStore();
  return (
    <>
      {store?.State.error ? (
        <Error />
      ) : (
        <>
          <Header />
          <Component {...pageProps} />
          <ScrollTop />
          <Footer />
          <Alert />
        </>
      )}
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <StoreProvider>
        <Layout Component={Component} pageProps={pageProps} />
      </StoreProvider>
    </>
  );
}

export default MyApp;
