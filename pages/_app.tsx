import { Container } from "@mui/material";
import { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import AlertProvider from "../components/alert/Alert";
import Error from "../components/error/Error";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import MetaTages from "../components/metaTags/MetaTages";
import AdminRoute from "../components/protectedRoute/AdminRoute";
import UserRoute from "../components/protectedRoute/UserRoute";
import ScrollTop from "../components/shared/utilitize/ScrollTop";
import useStore from "../contex/hooks/useStore";
import StoreProvider from "../contex/providers/StoreProvider";
import "../styles/account.css";
import "../styles/customization.css";
import "../styles/deshboard.css";
import "../styles/footer.css";
import "../styles/globals.css";
import "../styles/header.css";
import "../styles/home.css";
import "../styles/loginRegister.css";
import "../styles/product.css";
import "../styles/shop.css";
import "../styles/utilitize.css";

type Props = {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
};

function Layout({ Component, pageProps }: Props) {
  const store = useStore();
  const router = useRouter();
  const userRoute = ["/account", "/checkout"];
  const adminRoute = ["/deshboard"];

  return (
    <Container maxWidth='xl'>
      {store?.State.error ? (
        <Error />
      ) : (
        <>
          <MetaTages />
          <Header />
          {adminRoute.includes(router.pathname) ? (
            <AdminRoute>
              <Component {...pageProps} />
            </AdminRoute>
          ) : userRoute.includes(router.pathname) ? (
            <UserRoute>
              <Component {...pageProps} />
            </UserRoute>
          ) : (
            <Component {...pageProps} />
          )}
          <ScrollTop />
          <Footer />
          <AlertProvider />
        </>
      )}
    </Container>
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
