import useStore from "../../contex/hooks/useStore";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const AlertProvider = () => {
  const store = useStore();

  return (
    <Snackbar
      open={store?.State.alert.msg ? true : false}
      autoHideDuration={5000}
      onClose={(e, reason) => {
        if (reason === "clickaway") return;
        store?.State.setAlert({ msg: "", type: "info" });
      }}
    >
      <Alert severity={store?.State.alert.type}>{store?.State.alert.msg}</Alert>
    </Snackbar>
  );
};

export default AlertProvider;
