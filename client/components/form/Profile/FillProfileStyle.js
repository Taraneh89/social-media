import { makeStyles } from "@material-ui/core/styles";

export const UseStyle = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  rootPaper: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },

  image: {
    backgroundImage: "url(/images/homeimages/bg.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#ff3366",
    background: "",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130,
    background: "",
  },
  margin: {
    margin: theme.spacing(3, 0, 2),
  },
}));
