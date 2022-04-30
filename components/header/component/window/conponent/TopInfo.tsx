import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Link from "next/link";

const TopInfo = () => {
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
        <p>
          <PersonOutlineOutlinedIcon />
          <Link href='/login'>
            <a>Account</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TopInfo;
