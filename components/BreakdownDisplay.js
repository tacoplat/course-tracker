import { Box, IconButton, Tab, Tabs } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import BreakdownControls from "./BreakdownControls";

import sampleData from "./sampleData/sampleTaskData.json";

const { tasks } = sampleData;

const courseList = tasks.map((task) => task.course).sort();

const formatHeader = (header) => {
  const wordMatch = /\w[^A-Z\s]*/g;
  const words = header.match(wordMatch);
  return words
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const concatenateProperties = (obj) =>
  typeof obj !== "string" ? Object.values(obj).join("T") : obj;

const determineMaxValue = (taskArr, prop) => {
  const arr = taskArr.map((task) => {
    if (typeof task[prop] === "object")
      return concatenateProperties(task[prop]);
    return task[prop];
  });
  return arr.reduce((a, b, i) => {
    if (i === 0) {
      return Math.max(`${a}`.length, `${b}`.length);
    }
    return Math.max(a, `${b}`.length);
  }, 0);
};
const determineFlex = (tasksArr, header) =>
  Math.max(determineMaxValue(tasksArr, header), header.length);

const columns = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    hide: true,
  },
].concat(
  ...Object.keys(tasks[0]).map((header) => {
    if (header === "done") {
      return {
        field: header,
        headerName: formatHeader(header),
        flex: determineFlex(tasks, header),
        renderCell: (params) => (
          <IconButton disableRipple>
            {params.row.done ? <MdIcons.MdDone /> : null}
          </IconButton>
        ),
      };
    }
    return {
      field: header,
      headerName: formatHeader(header),
      flex: determineFlex(tasks, header),
    };
  })
);

const rowsBase = tasks.map((task, index) => {
  const row = {};
  Object.values(columns)
    .map((col, i) => {
      if (i === 0) return { id: index };
      if (col.field === "startDate") {
        return {
          [col.field]: new Date(task[col.field]).toLocaleDateString("en-CA", {
            dateStyle: "medium",
          }),
        };
      }
      if (typeof task[col.field] === "object")
        return {
          [col.field]: new Date(
            concatenateProperties(task[col.field])
          ).toLocaleString("en-CA", {
            dateStyle: "long",
            timeStyle: "short",
          }),
        };
      return { [col.field]: task[col.field] };
    })
    .forEach((property) => {
      Object.assign(row, property);
    });
  return row;
});

export default function BreakdownDisplay() {
  const [value, setValue] = useState("All");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const toShow = new Set();

  const rows =
    value === "All" ? rowsBase : rowsBase.filter((row) => row.course === value);

  return (
    <>
      <Box>
        <Tabs value={value} onChange={handleChange}>
          {[
            <Tab
              label="All"
              value="All"
              sx={{ textTransform: "none" }}
              centerRipple
            />,
            ...courseList.map((task) => {
              if (!toShow.has(task)) {
                toShow.add(task);
                return <Tab label={task} value={task} centerRipple />;
              }
              return false;
            }),
          ]}
        </Tabs>
      </Box>
      <BreakdownControls />
      <DataGrid
        columns={columns}
        rows={rows}
        sx={{ width: "60vw" }}
        hideFooterPagination
        disableSelectionOnClick
        checkboxSelection
      />
    </>
  );
}
