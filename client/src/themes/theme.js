import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 12,
    button: {
      textTransform: "none",
      fontWeight: "bold",
      fontSize: 14,
      width: 110,
      height: 40
    }
  },
  palette: {
    primary: { main: "#3A8DFF" }
  }
});
