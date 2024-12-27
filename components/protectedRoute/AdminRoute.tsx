import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useStore from "../../contex/hooks/useStore";
import Spinner from "../shared/Spinner";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const store = useStore();
  useEffect(() => {
    if (!store?.firebase.user && !store?.firebase.loading) {
      router.push("/login");
    } else if (
      store?.firebase.userRole === "user" &&
      !store?.firebase.loading
    ) {
      router.push("/");
    }
  }, [router, store]);

  return (
    <>
      {store?.firebase.userRole && store?.firebase.userRole !== "user" ? (
        children
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default AdminRoute;
