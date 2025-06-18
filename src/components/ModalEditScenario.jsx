import React, { useState, useEffect } from "react";
import { Modal, Box, Stack, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: "0.75rem",
    boxShadow: 24,
    p: 4,
};

export default function ModalEditScenario({
    open,
    handleClose,
    schedule,
    onUpdated,
}) {
    const token = Cookies.get("token");

    const [name, setName] = useState(schedule?.name || "");
    const [condition, setCondition] = useState(schedule?.condition || "");
    const [command, setCommand] = useState(schedule?.command || "");
    const [loading, setLoading] = useState(false);

    // When schedule changes, update local state
    useEffect(() => {
        setName(schedule?.name || "");
        setCondition(schedule?.condition || "");
        setCommand(schedule?.command || "");
    }, [schedule]);

    const handleSubmit = () => {
        if (!name.trim() || !condition.trim() || !command.trim()) {
            alert("All fields are required.");
            return;
        }
        setLoading(true);
        axios
            .put(
                `http://localhost:3001/action/update?scheduleId=${schedule.id}`,
                {
                    name,
                    condition,
                    command,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            )
            .then(() => {
                setLoading(false);
                onUpdated(); // Notify parent to refresh data
                handleClose();
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
                alert("Failed to update");
            });
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Stack spacing={2}>
                    <Typography variant="h6" className="mb-4">
                        Edit Scenario
                    </Typography>
                    <TextField
                        label="Scenario Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Condition"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Command"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        fullWidth
                    />
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                    >
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}
