import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Scenario name is required"),
  condition: z.string().min(1, "Condition is required"),
  command: z.string().min(1, "Command is required"),
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "0.75rem",
  boxShadow: 24,
  p: 4,
};

export default function CreateActionModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [command, setCommand] = useState("");
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    condition: "",
    command: "",
  });

  // Fetch userId on mount
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    axios
      .get(
        "http://localhost:3001/user/validate",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setUserId(res.data?.user?.id || null);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
      });
  }, []);

  const resetForm = () => {
    setName("");
    setCondition("");
    setCommand("");
    setErrors({ name: "", condition: "", command: "" });
  };

  const handleCreate = () => {
    const result = schema.safeParse({ name, condition, command });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0] || "",
        condition: fieldErrors.condition?.[0] || "",
        command: fieldErrors.command?.[0] || "",
      });
      return;
    }

    const token = Cookies.get("token");
    if (!token || !userId) {
      return;
    }

    axios
      .post(
        "http://localhost:3001/action/create",
        {
          name,
          condition,
          command,
          userId, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setOpen(false);
        resetForm();
        window.location.reload();
      })
      .catch((err) => {
        console.error("Failed to create action:", err);
      });
  };

  return (
    <div className="p-4">
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Create Scenario
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" className="mb-4">
            Create Scenario 
          </Typography>

          <TextField
            label="Scenario Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />

          <TextField
            label="Condition"
            fullWidth
            margin="normal"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            error={Boolean(errors.condition)}
            helperText={errors.condition}
          />

          <TextField
            label="Command"
            fullWidth
            margin="normal"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            error={Boolean(errors.command)}
            helperText={errors.command}
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleCreate}>
              Create
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
