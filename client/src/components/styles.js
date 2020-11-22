import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
  },
  toolbar: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "0.5rem",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    cursor: "pointer",
  },
  image: {
    marginLeft: "15px",
  },
  logout: {
    padding: "0.3rem",
  },
}));
