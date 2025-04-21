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
    return (
        <Grid
            container
            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
            <Grid item size="auto" minWidth={600}>
                <PluginDashboard name="Humidity" desciption="Kitchen">
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                            },
                        ]}
                        className="mr-10"
                    />
                </PluginDashboard>
            </Grid>
            <Grid item size="auto" minWidth={600}>
                <PluginDashboard name="Power Consumption" desciption="kW/h">
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                            },
                        ]}
                        // maxHeight={300}
                        // maxWidth={400}
                        className="mr-10"
                    />
                </PluginDashboard>
            </Grid>
            <Grid item size="full">
                <PluginDashboard name="Temperature" desciption="Kitchen">
                    <Typography variant="h3" component="div" className="p-5">
                        19.5°C
                    </Typography>
                </PluginDashboard>
            </Grid>
            <Grid item size="full" minWidth={600}>
                <PluginDashboard name="Wate Consumption" desciption="m³">
                    <GraphMonitor
                        legend="Humidity (%)"
                        x={x}
                        series={[
                            {
                                data: [31, 32, 31, 33, 31, 30],
                                label: "Kitchen",
                            },
                            {
                                data: [51, 49, 53, 50, 49, 47],
                                label: "Bathroom",
                            },
                            {
                                data: [32, 33, 31, 34, 35, 31],
                                label: "Living Room",
                            },
                        ]}
                    />
                </PluginDashboard>
            </Grid>
        </Grid>
    );
}
