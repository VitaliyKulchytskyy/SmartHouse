import {
    Card,
    CardActions,
    CardContent,
    Typography,
    IconButton,
    Stack,
    ToggleButtonGroup,
    ToggleButton
} from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ValueMonitor from "./ValueMonitor";

function Lamp() {
    const [value, setValue] = useState("#ffffff");
    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const [alignment, setAlignment] = useState('turn_on');
    const handleAlignment = (
      event,
      newAlignment
    ) => {
      setAlignment(newAlignment);
    };

    return (
        <Stack spacing={2}>
            <MuiColorInput format="hex" value={value} onChange={handleChange} />
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
            >
                <ToggleButton value="turn_on" aria-label="left aligned">
                    <Typography>Turn on</Typography>
                </ToggleButton>
                <ToggleButton value="turn_off" aria-label="centered">
                    <Typography>Turn off</Typography>
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
}

function IpCamera() {
    return (
        <Stack>
            <Typography>The camera is recording</Typography>
        </Stack>
    );
}

function HumiditySensor() {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(Math.floor(Math.random() * 101)); 
        }, 2000);

        return () => clearInterval(interval); 
    }, []);


    return (
        <ValueMonitor value={value} min={0} max={100} />
    )
}

function TemperatureSensor() {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((Math.random() * 60.0).toFixed(2)); 
        }, 2000);

        return () => clearInterval(interval); 
    }, []);


    return (
        <ValueMonitor value={value} min={0} max={100} />
    )
}

const COMPONENTS = {
    lamp: Lamp,
    ip_camera: IpCamera,
    humidity_sensor: HumiditySensor,
    temperature_sensor: TemperatureSensor
};

export default function Device({ device }) {
    const DeviceMap = COMPONENTS[device.type];

    return (
        <Card className="w-[320px] h-60 flex flex-col" variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div">
                    {device.type}
                </Typography>
                <Typography component="div">{device.name}</Typography>
            </CardContent>
            <div className="items-center">
                {DeviceMap ? <DeviceMap /> : <div>Unknown device!</div>}
            </div>
            <CardActions className="mt-auto">
                <Stack
                    direction="horizontal"
                    sx={{
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                    }}
                >
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </Stack>
            </CardActions>
        </Card>
    );
}
