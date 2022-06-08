import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import useStore from "../../contex/hooks/useStore";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";

type Props = { title: "register" | "login" };
type Data = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
};

function LoginRegister({ title }: Props) {
  const [isVarificationSent, setIsVarificationSent] = useState(false);
  const { handleSubmit, register, reset } = useForm<Data>();
  const [error, setError] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState("");
  const varificationDiv = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const store = useStore();

  async function googleLogIn() {
    if (store) {
      const { error, message } = await store?.firebase?.googleSingIn();
      if (!error) {
        router.push(store.State.redirect || "/");
      } else {
        setError(message);
      }
    }
  }

  async function emailSignUp(data: Data) {
    const { name, email, password } = data;
    if (store) {
      const result = await store.firebase.emailSignUp(name, email, password);
      if (!result.error) {
        const { error } = await store.firebase.varifyEmail(result.user);
        if (!error) {
          reset();
          setIsVarificationSent(true);
          setInterval(() => {
            router.push(store.State.redirect || "/");
          }, 3000);
        }
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
        router.push(store.State.redirect || "/");
      } else {
        setError(result.message!);
      }
    }
  }

  function onSubmit(data: Data) {
    store?.State.setLoading(true);
    setError(null);
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

  async function forgerPassword() {
    if (store) {
      const { error } = await store.firebase.resetPassword(emailValue);
      if (!error) {
        setIsVarificationSent(true);
      } else {
        store.State.setAlert("Somthing went wrong");
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const isContain = varificationDiv.current?.contains(e.target as Node);
      if (!isContain) {
        setIsVarificationSent(false);
      }
    });
  }, []);

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
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder='Enter email'
          />
          <label>Password:</label>
          <input
            {...register("password", { required: true })}
            type='password'
            minLength={8}
            placeholder='Enter password'
          />
          <div
            hidden={!error || title !== "login"}
            className='col-span-3 text-right'
          >
            <Button type='button' onClick={forgerPassword} variant='outlined'>
              forget password
            </Button>
          </div>
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
            {error?.includes("Firebase: ")
              ? error?.replace(/firebase: /i, "")
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

        {/* varification part */}
        <div hidden={!isVarificationSent} className='varification-container'>
          <div>
            <CheckCircleIcon />
          </div>
          <b>
            Varification email has been sent! <br />
            If you not found email, please check your spam email or click resend
            email button
          </b>
          <Button variant='outlined'>Resend email</Button>
        </div>
      </div>
    </>
  );
}

export default LoginRegister;
