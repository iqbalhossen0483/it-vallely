import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useRef, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import {
  fetchAPI,
  handleError,
} from "../../../clientServices/shared/sharedFunction";
import useStore from "../../../contex/hooks/useStore";
import Input from "../../shared/utilitize/Input";
import { useForm } from "react-hook-form";

interface Props {
  value: number;
  index: number;
}
type AddUser = { name: string; email: string; password: string };

const ManageUser = ({ value, index }: Props) => {
  const [filterUser, setFilterUser] = useState<UserRecord[] | null>(null),
    [users, setUsers] = useState<UserRecord[] | null>(null),
    [updateUserForm, setUpdateUpdateuserForm] = useState(-1),
    { handleSubmit, register, reset } = useForm<AddUser>(),
    [addUserform, setAddUserform] = useState(false),
    [filterRole, setFilterRole] = useState("All"),
    roles = ["All", "Admin", "Manager", "User"],
    tableRef = useRef<HTMLTableElement>(null),
    [update, setUpdate] = useState(false),
    store = useStore();

  // fetch data;
  useEffect(() => {
    (async () => {
      const token = await store?.firebase.user?.getIdToken();
      const users = await fetchAPI<UserRecord[]>("/api/user", {
        headers: {
          user_uid: `${store?.firebase.user?.uid}`,
          token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
        },
      });
      if (users.data) {
        setUsers(users.data);
        setFilterUser(users.data);
        setFilterRole("All");
      } else handleError(users, store?.State!);
    })();

    document.addEventListener("click", (e) => {
      const isContain = tableRef.current?.contains(e.target as Node);
      if (!isContain) setUpdateUpdateuserForm(-1);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  //toggle form
  function handleForm(index: number) {
    if (index !== updateUserForm) setUpdateUpdateuserForm(index);
    else setUpdateUpdateuserForm(-1);
  }

  //filter user by role;
  function handleFilterUser(role: string) {
    setFilterRole(role);
    if (role === "All") return setFilterUser(users);

    const filtered = users?.filter((user) =>
      user.customClaims?.role
        ? user.customClaims.role === role
        : "User" === role
    );
    setFilterUser(filtered || null);
  }

  //update user role
  async function updateUserRole(uid: string, newRole: UserRoles) {
    const token = await store?.firebase.user?.getIdToken();
    const result = await fetchAPI<{ message: string }>("/api/user", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        user_uid: `${store?.firebase.user?.uid}`,
        token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
      },
      body: JSON.stringify({ uid, newRole }),
    });
    if (result.data) {
      store?.State.setAlert("User role has been modified");
    } else handleError(result, store?.State!);
    setUpdate((prev) => !prev);
    setUpdateUpdateuserForm(-1);
  }

  //disable and enable user;
  async function disableAndEnable(uid: string, value: "enable" | "disable") {
    store?.State.setLoading(true);
    const token = await store?.firebase.user?.getIdToken();
    const result = await fetchAPI<{ message: string }>(
      `/api/user?${value}=true`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          user_uid: `${store?.firebase.user?.uid}`,
          token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
        },
        body: JSON.stringify({ uid }),
      }
    );
    if (result.data) {
      store?.State.setAlert(`User has been ${value}`);
    } else handleError(result, store?.State!);
    setUpdate((prev) => !prev);
    store?.State.setLoading(false);
  }

  async function addUser(data: AddUser) {
    console.log(data);
  }

  return (
    <div
      hidden={value !== index}
      style={{ position: "relative" }}
      className='w-[80%]'
    >
      <Table ref={tableRef}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='center'>Email</TableCell>
            <TableCell>Varified</TableCell>
            <TableCell align='center' sx={{ position: "relative" }}>
              <TextField
                id='standard-select-currency'
                helperText='filter user by role'
                value={filterRole}
                onChange={(e) => {
                  handleFilterUser(e.target.value);
                }}
                variant='standard'
                select
              >
                {roles.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <div className='user-add-btn'>
                <Button onClick={() => setAddUserform((prev) => !prev)}>
                  <AddBoxIcon />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterUser?.map((user, index) => (
            <TableRow hover key={index} sx={{ position: "relative" }}>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.emailVerified ? "True" : "False"}</TableCell>
              <TableCell align='center'>
                <b>{user.customClaims?.role || "User"}</b>
                <div className='flex gap-1'>
                  <Button onClick={() => handleForm(index)} variant='outlined'>
                    <EditIcon />
                  </Button>
                  <Button variant='outlined'>
                    <DeleteIcon />
                  </Button>
                  <Button
                    disabled={store?.State.loading}
                    onClick={() =>
                      disableAndEnable(
                        user.uid,
                        user.disabled ? "enable" : "disable"
                      )
                    }
                    variant='outlined'
                  >
                    {user.disabled ? (
                      <ToggleOffIcon
                        fontSize='large'
                        fill='gray'
                        color='disabled'
                      />
                    ) : (
                      <ToggleOnIcon fontSize='large' />
                    )}
                  </Button>
                </div>
              </TableCell>
              {index === updateUserForm && (
                <TableCell className='edit-form'>
                  <Button onClick={() => updateUserRole(user.uid, "Admin")}>
                    Admin
                  </Button>
                  <Button onClick={() => updateUserRole(user.uid, "Manager")}>
                    Manager
                  </Button>
                  <Button onClick={() => updateUserRole(user.uid, "User")}>
                    User
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <form
        onSubmit={handleSubmit(addUser)}
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
        <Button type='submit' variant='contained' className='bg-mui'>
          add
        </Button>
      </form>

      <div
        className={
          filterUser && filterUser?.length ? "hidden" : "empty-message"
        }
      >
        <p>There is no user on this Role</p>
      </div>
    </div>
  );
};

export default ManageUser;
