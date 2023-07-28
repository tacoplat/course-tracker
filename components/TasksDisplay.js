import { Box } from "@mui/material";
import React from "react";
import TaskList from "./TaskList";

export default function TasksDisplay() {
  return (
    <Box
      sx={{
        margin: "0 1rem",
        width: 1,
      }}
    >
      <Box
        sx={{
          padding: { xs: 0, md: "1rem" },
          borderRadius: "4px 4px 0 0",
          border: { xs: 0, md: "1px solid rgba(224, 224, 224, 1)" },
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
          overflow: "hidden auto",
          maxHeight: { xs: 1000, md: 380 },
          padding: "0 1.8rem",
          borderLeft: { xs: 0, md: "1px solid rgba(224, 224, 224, 1)" },
          borderRight: { xs: 0, md: "1px solid rgba(224, 224, 224, 1)" },
        }}
      >
        <TaskList />
      </Box>
      <Box
        sx={{
          padding: { xs: 0, md: "1rem" },
          borderRadius: "0 0 4px 4px",
          border: { xs: 0, md: "1px solid rgba(224, 224, 224, 1)" },
        }}
      />
    </Box>
  );
}
