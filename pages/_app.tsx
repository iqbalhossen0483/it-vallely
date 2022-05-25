import "@fortawesome/fontawesome-svg-core/styles.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../styles/customization.css";
import "../styles/loginRegister.css";
import "../styles/utilitize.css";
import "../styles/deshboard.css";
import "../styles/product.css";
import "../styles/globals.css";
import "../styles/header.css";
import "../styles/footer.css";
import "../styles/alert.css";
import "../styles/home.css";
import "../styles/shop.css";
import "../styles/account.css";
import ScrollTop from "../components/shared/utilitize/ScrollTop";
import StoreProvider from "../contex/providers/StoreProvider";
import { NextComponentType, NextPageContext } from "next";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import useStore from "../contex/hooks/useStore";
import Alert from "../components/alert/Alert";
import Error from "../components/error/Error";
import type { AppProps } from "next/app";
import MetaTages from "../components/metaTags/MetaTages";

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
          <MetaTages />
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
