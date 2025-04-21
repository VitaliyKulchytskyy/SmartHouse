import { Typography, Stack, Button } from "@mui/material";
import GradientHorizontal from "../components/GradientHorizontal";


export default function Error({ status="", message="" }) {
    return (
        <div>
            <Typography variant="h3" className="p-3">
                Error {status}
            </Typography>
            <div className="h-[10px]">
                <GradientHorizontal />
            </div>
            <Stack className="p-5" spacing={2}>
                <Typography variant="body">{message}</Typography>
                <Button
                    variant="outlined"
                    className="w-[128px]"
                    onClick={() => navigate(-1)}
                >
                    Go back
                </Button>
            </Stack>
        </div>
    );
}
