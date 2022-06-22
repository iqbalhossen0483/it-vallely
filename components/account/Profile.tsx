import Image from "next/image";
import React, { useRef } from "react";
import useStore from "../../contex/hooks/useStore";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EditIcon from "@mui/icons-material/Edit";
import { fetchAPI } from "../../clientServices/shared/sharedFunction";

interface Props {
  value: number;
  index: number;
}

const Profile = ({ value, index }: Props) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const store = useStore();

  async function updateProfile(file: FileList | null) {
    if (!file) return;
    const token = await store?.firebase.user?.getIdToken();
    const formData = new FormData();

    formData.append("avater", file[0]);
    const result = await fetchAPI("/api/user?avater=true", {
      method: "PUT",
      headers: {
        user_uid: `${store?.firebase.user?.uid}`,
        token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
      },
      body: formData,
    });
    console.log(result);
  }

  return (
    <div hidden={value !== index} className='profile'>
      <div className='profile-pic'>
        <input
          ref={fileInput}
          onChange={(e) => updateProfile(e.target.files)}
          type='file'
          name='avater'
          accept='image/*'
          hidden
        />
        {store?.firebase.user?.photoURL ? (
          <Image
            height={100}
            width={100}
            src={store?.firebase.user?.photoURL}
            alt=''
          />
        ) : (
          <PermIdentityIcon className='alt-profile' />
        )}
        <div onClick={() => fileInput.current?.click()} className='edit-icon'>
          <EditIcon />
        </div>
      </div>
    </div>
  );
};

export default Profile;
