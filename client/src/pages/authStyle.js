import { makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    width: "50%",
    margin: "0 auto",
  },
  [theme.breakpoints.down("sm")]: {
    form: {
      width: "100%",
    },
  },
  fileInput: {
    width: "50%",
    margin: "10px 0",
  },
  buttonSubmit: {
    // marginBottom: 10,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display:'flex',
    justifyContent:'space-between',
    marginBottom: 10,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
