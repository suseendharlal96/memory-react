import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  toolbar: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    cursor: "pointer",
  },
  image: {
    marginLeft: "15px",
  },
}));
