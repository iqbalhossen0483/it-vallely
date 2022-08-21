import { TableBody, TableRow, TableCell, Button } from "@mui/material";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import useStore from "../../../../contex/hooks/useStore";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

interface Props {
  filterUser: UserRecord[] | null;
  handleForm(index: number): void;
  handledeleteUser(uid: string): Promise<void>;
  handledisableAndEnable(
    uid: string,
    value: "enable" | "disable"
  ): Promise<void>;
  loading: boolean;
  updateUserForm: number;
  handleupdateUserRole(uid: string, newRole: UserRoles): Promise<void>;
}

const Body = (props: Props) => {
  const {
    filterUser,
    handleForm,
    handledeleteUser,
    handledisableAndEnable,
    loading,
    updateUserForm,
    handleupdateUserRole,
  } = props;
  const store = useStore();
  return (
    <TableBody>
      {filterUser?.map((user, index) => {
        if (user.uid === store?.firebase.user?.uid) return null;
        else {
          return (
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
                  <Button
                    disabled={loading}
                    onClick={() => {
                      handledeleteUser(user.uid);
                    }}
                    variant='outlined'
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    disabled={loading}
                    onClick={() =>
                      handledisableAndEnable(
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
                  <Button
                    disabled={store?.State.loading}
                    onClick={() => handleupdateUserRole(user.uid, "Admin")}
                  >
                    Admin
                  </Button>
                  <Button
                    disabled={store?.State.loading}
                    onClick={() => handleupdateUserRole(user.uid, "Manager")}
                  >
                    Manager
                  </Button>
                  <Button
                    disabled={store?.State.loading}
                    onClick={() => handleupdateUserRole(user.uid, "User")}
                  >
                    User
                  </Button>
                </TableCell>
              )}
            </TableRow>
          );
        }
      })}
    </TableBody>
  );
};

export default Body;
