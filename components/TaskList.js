import React, { useEffect, useState } from "react";
import {
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
} from "@mui/material";
import * as MdIcons from "react-icons/md";
import { grey, red, green, teal } from "@mui/material/colors";
import humanizeDuration from "humanize-duration";
import sampleData from "./sampleData/sampleTaskData.json";

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "cancel" },
          style: {
            color: teal[600],
            backgroundColor: "white",
          },
        },
        {
          props: { variant: "confirm" },
          style: {
            color: "white",
            backgroundColor: teal[600],
            "&:hover": {
              backgroundColor: teal[800],
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontWeight: 600,
        },
      },
    },
  },
});

const determine = (diffMs) => {
  const diffD = diffMs / 1000 / 60 / 60 / 24;
  if (diffD >= 7)
    return {
      icon: <MdIcons.MdHourglassTop />,
      color: grey[700],
    };
  if (diffD < 7 && diffD >= 3)
    return {
      icon: <MdIcons.MdHourglassBottom />,
      color: grey[700],
    };
  if (diffD < 3 && diffD >= 0)
    return {
      icon: <MdIcons.MdHourglassBottom />,
      color: red[600],
    };
  return {
    icon: <MdIcons.MdHourglassEmpty />,
    color: red[900],
  };
};

const humanizeConfig = {
  units: ["d", "h", "m", "s"],
  round: true,
  largest: 2,
};
const humanizeLateConfig = {
  units: ["w", "d", "h", "m", "s"],
  round: true,
  largest: 2,
};

const createUTCString = ({ date, time }) => `${date}T${time}`;

export default function TaskList() {
  const { tasks } = sampleData;

  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [cTask, setcTask] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleOpenToggle = () => {
    setOpen(!open);
  };

  const handleTaskChange = ({ target }) => {
    setcTask(target.value);
    handleOpenToggle();
  };

  return (
    <>
      <List sx={{ width: 360 }}>
        {tasks
          .filter((task) => !task.completed)
          .sort((a, b) => {
            const aDue = new Date(createUTCString(a.due));
            const bDue = new Date(createUTCString(b.due));
            return aDue - bDue;
          })
          .map((task) => {
            const due = new Date(createUTCString(task.due));
            const diffMs = due - time;
            const values = determine(diffMs);
            return (
              <ListItem
                key={tasks.indexOf(task)}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="complete"
                    sx={{
                      "&:hover": {
                        color: green[500],
                      },
                    }}
                    value={task.name}
                    onClick={(e) => handleTaskChange(e)}
                  >
                    <MdIcons.MdDone style={{ zIndex: -3 }} />
                  </IconButton>
                }
              >
                <ListItemIcon sx={{ fontSize: "1.2rem", color: values.color }}>
                  {values.icon}
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      style={{ fontWeight: 600, color: values.color }}
                    >
                      {task.name} – {task.course}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      style={{ fontSize: "84%", color: values.color }}
                    >
                      Due {task.due.date} at {task.due.time} <br />
                      {diffMs > 0
                        ? `${humanizeDuration(diffMs, humanizeConfig)} left`
                        : `${humanizeDuration(
                            diffMs,
                            humanizeLateConfig
                          )} late`}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
      </List>
      <Dialog
        open={open}
        onClose={handleOpenToggle}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title" sx={{ fontWeight: 600 }}>
          Complete Task
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: "0.8rem" }}>
          <DialogContentText
            id="confirm-dialog-description"
            sx={{ textAlign: "left" }}
          >
            {`Are you sure you want to mark "${cTask}" as done?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ThemeProvider theme={theme}>
            <Button onClick={handleOpenToggle} variant="cancel">
              Cancel
            </Button>
            <Button onClick={handleOpenToggle} variant="confirm" autoFocus>
              It's Done
            </Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </>
  );
}
