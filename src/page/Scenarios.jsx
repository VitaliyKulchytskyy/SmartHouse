import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, IconButton, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Cookies from "js-cookie";
import ModalEditScenario from "../components/ModalEditScenario";
import ModalNewScenario from "../components/ModalNewScenario"; 

export default function Schedule() {
  const [rows, setRows] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const token = Cookies.get("token");

  // Fetch data
  useEffect(() => {
    fetchSchedules();
  }, [token]);

  const fetchSchedules = () => {
    axios
      .get("http://localhost:3001/action/read", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (resp) => {
        const schedulesData = resp.data.payload.schedules;

        const updatedRows = await Promise.all(
          schedulesData.map(async (schedule) => {
            const userResp = await axios.post(
              "http://localhost:3001/user/getById",
              { id: schedule.userId },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            return {
              id: schedule.id,
              name: schedule.name,
              condition: schedule.condition || "",
              command: schedule.command || "",
              createdBy: userResp.data.user.login,
            };
          })
        );

        setRows(updatedRows);
      })
      .catch(console.error);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this schedule?")) return;

    axios
      .delete(`http://localhost:3001/action/delete?scheduleId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete");
      });
  };

  const handleEditClick = (id) => {
    const schedule = rows.find((row) => row.id === id);
    if (!schedule) return;
    setSelectedSchedule(schedule);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedSchedule(null);
  };

  const handleAfterUpdate = () => {
    fetchSchedules();
  };

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "condition", headerName: "Condition", width: 250 },
    { field: "command", headerName: "Command", width: 200 },
    { field: "createdBy", headerName: "Created By", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton color="primary" size="small" onClick={() => handleEditClick(params.id)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton color="error" size="small" onClick={() => handleDelete(params.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Stack>
      <ModalNewScenario />
      <div className="w-full h-full flex flex-col">
        <DataGrid rows={rows} columns={columns} />
      </div>

      {selectedSchedule && (
        <ModalEditScenario
          open={editModalOpen}
          handleClose={handleEditModalClose}
          schedule={selectedSchedule}
          onUpdated={handleAfterUpdate}
        />
      )}
    </Stack>
  );
}
