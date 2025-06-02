import { Stack, Typography, Grid } from "@mui/material";
import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts";

export default function ResponsiveChart({ x, series }) {
    return (
        <div style={{ width: "100%" }}>        
            <LineChart
                xAxis={x}
                height={300}        
                series={series}                
                grid={{ vertical: true, horizontal: true }}
            />
        </div>
    );
}
