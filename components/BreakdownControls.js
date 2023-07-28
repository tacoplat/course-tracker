import React from "react";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import * as MdIcons from "react-icons/md";
import { green, red, yellow } from "@mui/material/colors";

export default function BreakdownControls() {
  return (
    <Box sx={{ margin: "0.4rem", alignSelf: "end" }}>
      <Tooltip title="Add Task(s)">
        <IconButton
          sx={{
            "&:hover": {
              color: green[500],
            },
          }}
        >
          <MdIcons.MdAddCircle />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit Task">
        <IconButton
          sx={{
            "&:hover": {
              color: yellow[800],
            },
          }}
        >
          <MdIcons.MdEdit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Remove Task(s)">
        <IconButton
          sx={{
            "&:hover": {
              color: red[700],
            },
          }}
        >
          <MdIcons.MdDelete />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
