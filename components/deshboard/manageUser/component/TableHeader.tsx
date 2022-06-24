import {
  TableHead,
  TableRow,
  TableCell,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import React from "react";

interface Props {
  filterRole: string;
  handleFilterUser(role: string): void;
  setAddUserform: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableHeader = (props: Props) => {
  const { filterRole, handleFilterUser, setAddUserform } = props,
    roles = ["All", "Admin", "Manager", "User"];
  return (
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
              <PersonAddAltIcon />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
