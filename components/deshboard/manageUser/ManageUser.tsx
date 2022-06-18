import LocationDisabledIcon from "@mui/icons-material/LocationDisabled";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
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
interface Props {
  value: number;
  index: number;
}
const ManageUser = ({ value, index }: Props) => {
  const [filterUser, setFilterUser] = useState<UserRecord[] | null>(null);
  const [users, setUsers] = useState<UserRecord[] | null>(null);
  const [filterRole, setFilterRole] = useState("All");
  const [showForm, setShowForm] = useState(-1);
  const store = useStore();
  const roles = ["All", "Admin", "Manager", "User"];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleForm(index: number) {
    if (index !== showForm) setShowForm(index);
    else setShowForm(-1);
  }
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

  return (
    <div hidden={value !== index} className='w-[80%]'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='center'>Email</TableCell>
            <TableCell align='center'>
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
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterUser?.map((user, index) => (
            <TableRow hover key={index} sx={{ position: "relative" }}>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell align='center'>
                <b>{user.customClaims?.role || "User"}</b>
                <div className='flex'>
                  <Button onClick={() => handleForm(index)} variant='outlined'>
                    <EditIcon />
                  </Button>
                  <Button variant='outlined'>
                    <DeleteIcon />
                  </Button>
                  <Button variant='outlined'>
                    <LocationDisabledIcon />
                  </Button>
                </div>
              </TableCell>
              <TableCell hidden={index !== showForm} className='edit-form'>
                <Button>Admin</Button>
                <Button>Manager</Button>
                <Button>User</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div
        className={`${
          filterUser && filterUser?.length ? "hidden" : "empty-message"
        }`}
      >
        <p>There is no user on this Role</p>
      </div>
    </div>
  );
};

export default ManageUser;
