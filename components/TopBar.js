import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";

const settings = ["Settings", "Logout"];

export default function TopBar() {
  const [anchUser, setAnchUser] = useState(null);

  const handleUserToggle = (e) => {
    setAnchUser(anchUser ? null : e.currentTarget);
  };

  const theme = createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily:
              "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
          },
        },
      },
    },
  });

  return (
    <AppBar
      position="sticky"
      sx={{ width: "100vw", backgroundColor: teal[500] }}
    >
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Coarse
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User Name">
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleUserToggle}
              >
                <Avatar alt="Profile Picture" src="/assets/images/goose.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchUser)}
              onClose={handleUserToggle}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleUserToggle}>
                  <ThemeProvider theme={theme}>
                    <Typography textAlign="center">{setting}</Typography>
                  </ThemeProvider>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
