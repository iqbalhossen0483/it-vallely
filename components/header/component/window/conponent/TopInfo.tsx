import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import useStore from "../../../../../contex/hooks/useStore";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "next/image";
import Link from "next/link";

const TopInfo = () => {
  const store = useStore();

  const signOut = async () => {
    if (store) {
      const { error } = await store.firebase.singOut();
      if (error) {
        store.State.setAlert({ msg: "Something went wrong!", type: "error" });
      }
    }
  };
  return (
    <div className='top-info'>
      <p>Welcome to It vallely!</p>
      <div className='right'>
        <p className='hidden md:block'>
          <AddLocationAltOutlinedIcon />{" "}
          <Link href='/contact'>
            <a>Contacts</a>
          </Link>
        </p>
        <p className='hidden md:block'>
          <HelpOutlineOutlinedIcon />{" "}
          <Link href='/contact'>
            <a>Need Help</a>
          </Link>
        </p>
        <div className='flex items-center gap-1'>
          {store?.firebase.user?.photoURL ? (
            <Image
              className='rounded-full'
              width={25}
              height={25}
              src={store.firebase.user.photoURL}
              alt=''
            />
          ) : (
            <PersonOutlineOutlinedIcon />
          )}
          <Link href={store?.firebase.user ? "/account" : "/login"}>
            <a>{store?.firebase.user?.displayName || "Account"}</a>
          </Link>
          {store?.firebase.user && (
            <LogoutIcon
              onClick={signOut}
              className='text-lg cursor-pointer fill-mui'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopInfo;
