import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const rows = [
    {
        id: 1,
        name: "Auto star",
        assertion: "Temperature.out.humidity >= 50",
        command: "RemoteRelay.on",
        createdBy: "Vitaliy Kulchytskyy",
    },
];

const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "condition", headerName: "Condition", width: 250 },
    { field: "command", headerName: "Command", width: 200 },
    { field: "createdBy", headerName: "Created By", width: 200 },
    // { field: "Invoke interval", headerName: "Created By", width: 300 },
];

export default function Schedule() {
    // const [schedules, setSchedules] = useState([]);
    const [rows, setRows] = useState([]);
    const token = Cookies.get("token");

    useEffect(() => {
        axios
            .get("http://localhost:3001/action/schedules", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(async (resp) => {
                const schedulesData = resp.data.payload.schedules;

                const updatedRows = await Promise.all(
                    schedulesData.map(async (schedule, index) => {
                        const userResp = await axios.post(
                            `http://localhost:3001/user/getById`,
                            { id: schedule.userId },
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            },
                        );

                        console.log(userResp.data);

                        return {
                            id: index,
                            name: schedule.name,
                            condition: schedule.condition,
                            command: schedule.command,
                            createdBy: userResp.data.user.login,
                        };
                    }),
                );

                setRows(updatedRows);
            });
    }, [token]);

    return (
        <Stack>
            <div className="w-full h-full flex flex-col">
                <DataGrid rows={rows} columns={columns} />
            </div>
        </Stack>
    );
}
