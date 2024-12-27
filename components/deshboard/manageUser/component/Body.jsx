import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import useStore from "../../../../contex/hooks/useStore";

// interface Props {
//   filterUser: UserRecord[] | null;
//   handleForm(index: number): void;
//   handledeleteUser(uid: string): Promise<void>;
//   handledisableAndEnable(
//     uid: string,
//     value: "enable" | "disable"
//   ): Promise<void>;
//   loading: boolean;
//   updateUserForm: number;
//   handleupdateUserRole(uid: string, newRole: UserRoles): Promise<void>;
// }

const Body = (props) => {
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
                <b>{user.role || "user"}</b>
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
                    onClick={() => handleupdateUserRole(user.uid, "admin")}
                  >
                    Admin
                  </Button>
                  <Button
                    disabled={store?.State.loading}
                    onClick={() => handleupdateUserRole(user.uid, "manager")}
                  >
                    Manager
                  </Button>
                  <Button
                    disabled={store?.State.loading}
                    onClick={() => handleupdateUserRole(user.uid, "user")}
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
