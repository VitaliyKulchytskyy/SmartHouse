import { Outlet } from "react-router";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import PluginDashboard from "../components/PluginDashboard";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";
import GraphMonitor from "../components/GraphMonitor";

export default function Dashboard() {
    let x = [
        {
            scaleType: "time",
            data: [
                new Date(2025, 3, 24, 13, 47, 38),
                new Date(2025, 3, 24, 13, 52, 38),
                new Date(2025, 3, 24, 13, 57, 38),
                new Date(2025, 3, 24, 14, 2, 38),
                new Date(2025, 3, 24, 14, 7, 38),
                new Date(2025, 3, 24, 14, 12, 38),
                new Date(2025, 3, 24, 14, 17, 38),
                new Date(2025, 3, 24, 14, 22, 38),
                new Date(2025, 3, 24, 14, 27, 38),
                new Date(2025, 3, 24, 14, 32, 38),
            ],
        },
    ];

    return (
        <Grid container rowSpacing={4} columnSpacing={4}>
            <Grid item size="full" width={800}>
                <PluginDashboard name="Humidity" desciption="Kitchen">
                    <GraphMonitor
                        x={x}
                        series={[
                            {
                                data: [44, 45, 46, 44, 43, 42, 41, 43, 44, 45],
                                label: "Kitchen",
                            },
                            {
                                data: [63, 64, 65, 63, 62, 61, 60, 62, 63, 64],
                                label: "Bathroom",
                            },
                            {
                                data: [48, 47, 49, 48, 47, 46, 45, 47, 48, 49],
                                label: "Living Room",
                            },
                        ]}
                    />
                </PluginDashboard>
            </Grid>

            <Grid item size="full" width={800}>
                <PluginDashboard name="Power Consumption" desciption="kWh">
                    <GraphMonitor
                        x={x}
                        series={[
                            {
                                data: [0.65, 0.66, 0.68, 0.67, 0.64, 0.63, 0.62, 0.64, 0.66, 0.67],
                                label: "Kitchen",
                            },
                            {
                                data: [0.32, 0.31, 0.33, 0.34, 0.32, 0.3, 0.29, 0.3, 0.31, 0.32],
                                label: "Bathroom",
                            },
                            {
                                data: [0.45, 0.44, 0.46, 0.47, 0.45, 0.43, 0.42, 0.43, 0.44, 0.45],
                                label: "Living Room",
                            },
                        ]}
                    />
                </PluginDashboard>
            </Grid>

            <Grid item size="full">
                <PluginDashboard name="Temperature" desciption="Kitchen">
                    <Typography variant="h3" component="div" className="p-5">
                        24.7°C
                    </Typography>
                </PluginDashboard>
            </Grid>

            <Grid item size="full" width={800}>
                <PluginDashboard name="Water Consumption" desciption="m³">
                    <GraphMonitor
                        x={x}
                        series={[
                            {
                                data: [0.0015, 0.0018, 0.002, 0.0022, 0.0017, 0.0016, 0.0014, 0.0018, 0.0019, 0.002],
                                label: "Kitchen",
                            },
                            {
                                data: [0.011, 0.012, 0.013, 0.0125, 0.0115, 0.011, 0.0105, 0.0112, 0.0118, 0.012],
                                label: "Bathroom",
                            },
                        ]}
                    />
                </PluginDashboard>
            </Grid>
        </Grid>
    );
}
