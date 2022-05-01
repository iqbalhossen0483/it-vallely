import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const Input = styled(TextField)({
  "& label.Mui-focused": {
    color: "#0e66a8",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#0e66a8",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#0e66a8",
    },
    "&:hover fieldset": {
      borderColor: "#0e66a8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0e66a8",
    },
  },
});

export default Input;
