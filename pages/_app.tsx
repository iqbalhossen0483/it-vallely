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
import MetaTages from "../components/metaTags/MetaTages";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import useStore from "../contex/hooks/useStore";
import Alert from "../components/alert/Alert";
import Error from "../components/error/Error";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import UserRoute from "../components/protectedRoute/UserRoute";

type Props = {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
};

function Layout({ Component, pageProps }: Props) {
  const store = useStore();
  const router = useRouter();
  const protectedRoute = ["/account", "/checkout", "/deshboard"];

  return (
    <>
      {store?.State.error ? (
        <Error />
      ) : (
        <>
          <MetaTages />
          <Header />
          {protectedRoute.includes(router.pathname) ? (
            <UserRoute>
              <Component {...pageProps} />
            </UserRoute>
          ) : (
            <Component {...pageProps} />
          )}
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
