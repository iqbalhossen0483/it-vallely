import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import useStore from "../../contex/hooks/useStore";
import { useForm } from "react-hook-form";
import { useState } from "react";

type Props = { title: "register" | "login" };
type Data = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
};

function LoginRegister({ title }: Props): JSX.Element {
  const { handleSubmit, register, reset } = useForm<Data>();
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const store = useStore();

  async function googleLogIn() {
    if (store) {
      const { error, message } = await store?.firebase?.googleSingIn();
      if (!error) {
        router.push("/");
      } else {
        setError(message!);
      }
    }
  }

  async function emailSignUp(data: Data) {
    const { name, email, password } = data;
    if (store) {
      const result = await store.firebase.emailSignUp(name, email, password);
      if (!result.error) {
        router.push("/");
      } else {
        setError(result.message!);
      }
    }
  }
  async function emailSinIn(data: Data) {
    const { email, password } = data;
    if (store) {
      const result = await store.firebase.emailSingIn(email, password);
      if (!result.error) {
        router.push("/");
      } else {
        setError(result.message!);
      }
    }
  }

  function onSubmit(data: Data) {
    store?.State.setLoading(true);
    setError("");
    if (title === "register") {
      if (data.password !== data.rePassword) {
        setError("Your password doesn't matched each other");
        return;
      }
      emailSignUp(data);
    } else if (title === "login") {
      emailSinIn(data);
    }
    store?.State.setLoading(false);
  }

  return (
    <>
      <div className='login-register'>
        <h3>Please {title}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {title === "register" && (
            <>
              <label>Name:</label>
              <input
                {...register("name", { required: true })}
                type='text'
                placeholder='Enter your name'
              />
            </>
          )}
          <label>Email:</label>
          <input
            {...register("email", { required: true })}
            type='email'
            placeholder='Enter email'
          />
          <label>Password:</label>
          <input
            {...register("password", { required: true })}
            type='password'
            minLength={8}
            placeholder='Enter password'
          />
          {title === "register" && (
            <>
              <label>Password:</label>
              <input
                {...register("rePassword", { required: true })}
                type='password'
                minLength={8}
                placeholder='Re-type password'
              />
            </>
          )}
          <p hidden={!error}>
            {error.includes("firebase: ")
              ? error.replace(/firebase: /i, "")
              : error}
          </p>
          <Button
            type='submit'
            disabled={store?.State.loading}
            variant='outlined'
          >
            {title}
          </Button>
        </form>

        <div className='other-option'>
          <div className='title'>
            <p>------------- Or -------------</p>
            <p>{title} with</p>
          </div>
          <div className='options'>
            <Button onClick={googleLogIn} variant='outlined'>
              <GoogleIcon /> GOOGLE
            </Button>
            <Button variant='outlined'>
              <FacebookIcon /> FACEBOOK
            </Button>
          </div>
        </div>
        <div className='having-account'>
          <p>
            {title === "register"
              ? "Already have an account? Please "
              : "New user? Please "}
            <span
              onClick={() =>
                router.push(`${title === "register" ? "login" : "register"}`)
              }
            >
              {title === "register" ? "login" : "register"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginRegister;
