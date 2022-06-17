import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useStore from "../../contex/hooks/useStore";
import Spinner from "../shared/utilitize/Spinner";

const UserRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const store = useStore();
  useEffect(() => {
    if (!store?.firebase.user && !store?.firebase.loading) {
      store?.State.setRidirect(router.pathname);
      router.push("/login");
    }
  }, [router, store]);

  return (
    <>
      {store?.firebase.user ? (
        store.firebase.user.emailVerified ? (
          children
        ) : (
          <div>
            <p>Please varify your email</p>
            <p>
              We send a email to your email, If you not found any email, Please
              ask to Resend email
            </p>
            <Button>Resend</Button>
          </div>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default UserRoute;
