import { Typography, Stack, Button } from "@mui/material";
import GradientHorizontal from "../components/GradientHorizontal";
import { useNavigate } from "react-router-dom";


export default function Error({ status="", message="" }) {
    const navigate = useNavigate();

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
                    onClick={() => navigate("/")}
                >
                    Go to main
                </Button>
            </Stack>
        </div>
    );
}
