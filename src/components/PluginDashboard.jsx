import {
    Card,
    CardActions,
    CardContent,
    Typography,
    IconButton,
    Stack,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { Link } from "react-router-dom";


export default function PluginDashboard({ name, desciption, src, children }) {
    return (
        <Card className="flex flex-col h-full" variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography component="div">{desciption}</Typography>
            </CardContent>
            <div className="h-full mx-5 my-1 flex justify-center items-center">{children}</div>
            <CardActions className="mt-auto bg-violet-50">
                <Stack
                    direction="horizontal"
                    sx={{
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                    }}
                >
                    <Link
                        to={src}
                    >
                        <div className="flex flex-row items-baseline text-indigo-300 hover:text-purple-700 hover: transition-all duration-150">
                            <LaunchIcon sx={{ fontSize: 40 }} className="p-1 " />
                        </div>
                    </Link>
                </Stack>
            </CardActions>
        </Card>
    );
}
