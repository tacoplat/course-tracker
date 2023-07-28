import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  createTheme,
  ThemeProvider,
  Paper,
} from "@mui/material";
import * as MdIcons from "react-icons/md";
import { teal } from "@mui/material/colors";
import { useRouter } from "next/router";

const theme = createTheme({
  components: {
    MuiTouchRipple: {
      rippleVisible: {
        animationDuration: "20ms",
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          width: "100vw",
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          fontSize: "1.4rem",
          color: teal[400],
          "&.Mui-selected": {
            color: teal[600],
          },
        },
        label: {
          fontSize: "0.8rem",
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
          fontWeight: "500",
        },
      },
    },
  },
});

export default function Navigation(props) {
  const { current } = props;
  const [value, setValue] = useState(current);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const router = useRouter();
  const onLink = (href) => {
    router.push(href);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          <BottomNavigationAction
            label="To Do"
            value="todo"
            centerRipple
            icon={<MdIcons.MdAssignment />}
            onClick={() => onLink("/todo")}
          />
          <BottomNavigationAction
            label="Breakdown"
            value="breakdown"
            centerRipple
            icon={<MdIcons.MdTableView />}
            onClick={() => onLink("/breakdown")}
          />
          <BottomNavigationAction
            label="Stats"
            value="stats"
            centerRipple
            icon={<MdIcons.MdBarChart />}
            onClick={() => onLink("/statistics")}
          />
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  );
}
