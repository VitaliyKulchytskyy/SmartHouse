import { Stack, Typography, Grid2 } from "@mui/material";
import { LineChart } from "@mui/x-charts";


export default function GraphMonitor({
    x,
    series,
    legend,
    wGraph = 1200,
    hGraph = 300,
    minValue = 0,
    maxValue = 100,
}) {
    return (
        <Stack
            direction="horizontal"
            sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}
        >
            <div>
                <Typography variant="h6">{legend}</Typography>
                <LineChart
                    xAxis={x}
                    series={series}
                    width={wGraph}
                    height={hGraph}
                    grid={{ vertical: true, horizontal: true }}
                />
            </div>
            <Grid2 container columns={series.length} spacing={8} className="m-auto">
                {series.map((s) => (
                    <ValueMonitor
                        value={s.data.slice(-1)}
                        legend={s.label}
                        min={minValue}
                        max={maxValue}
                    />
                ))}
            </Grid2>
        </Stack>
    );
}
