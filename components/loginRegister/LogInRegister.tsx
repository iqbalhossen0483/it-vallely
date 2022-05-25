import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Button } from "@mui/material";
import MetaTages from "../../components/metaTags/MetaTages";
import { useRouter } from "next/router";

function LoginRegister({ title }: { title: string }): JSX.Element {
  const router = useRouter();
  return (
    <>
      <div className='login-register'>
        <h3>Please {title}</h3>
        <form>
          {title === "register" && (
            <>
              <label>Name:</label>
              <input type='text' placeholder='Enter your name' />
            </>
          )}
          <label>Email:</label>
          <input type='email' placeholder='Enter email' />
          <label>Password:</label>
          <input type='password' placeholder='Enter password' />
          {title === "register" && (
            <>
              <label>Password:</label>
              <input type='password' placeholder='Re-type password' />
            </>
          )}
          <Button variant='outlined'>{title}</Button>
        </form>
        <div className='other-option'>
          <div className='title'>
            <p className='font-medium'>------------- Or -------------</p>
            <p>{title} with</p>
          </div>
          <div className='options'>
            <Button variant='outlined'>
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
