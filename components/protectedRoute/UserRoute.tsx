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

  async function resentEmail() {
    await store?.firebase.varifyEmail(store.firebase.user!);
    store?.State.setAlert({
      msg: "Email sent, check your email",
      type: "info",
    });
  }

  return (
    <>
      {store?.firebase.user ? (
        store.firebase.user.emailVerified ? (
          children
        ) : (
          <div className='empty-message text-center w-2/4 mx-auto'>
            <div>
              <p>Please varify your email</p>
              <p>
                We send a email to your email address, If you not found any
                email, Please check your spam box or ask to resend email.
              </p>
              <Button onClick={resentEmail} variant='outlined' className='mt-3'>
                Resend
              </Button>
            </div>
          </div>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default UserRoute;
