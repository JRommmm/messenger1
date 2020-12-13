import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#FFFFFF" }
  }
});
