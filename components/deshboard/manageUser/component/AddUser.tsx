import { AddUser as AddUserForm } from "../../../../clientServices/manageUser/addUser";
import Input from "../../../shared/utilitize/Input";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import React from "react";

type Props = {
  handleaddUser(data: AddUserForm): Promise<void>;
  addUserform: boolean;
  loading: boolean;
};

const AddUserForm = (props: Props) => {
  const { handleaddUser, addUserform, loading } = props;
  const { handleSubmit, register } = useForm<AddUserForm>();
  return (
    <form
      onSubmit={handleSubmit(handleaddUser)}
      className={addUserform ? "add-user" : "hidden"}
    >
      <Input
        {...register("name", { required: true })}
        type='text'
        label='User name'
      />
      <Input
        {...register("email", { required: true })}
        type='email'
        label='User eamil'
      />
      <Input
        {...register("password", { required: true })}
        type='password'
        label='password'
      />
      <Button
        disabled={loading}
        type='submit'
        variant='contained'
        className='bg-mui'
      >
        add
      </Button>
    </form>
  );
};

export default AddUserForm;
