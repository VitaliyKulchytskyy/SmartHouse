import { Grid2 } from "@mui/material";
import Device from "../components/Device";
import BaseLayout from "../layout/BaseLayout";


export default function Control() {
    const devicesSchema = [
        {
            room: "room",
            type: "lamp",
            ip: "192.168.0.112",
            health: true,
        },
        {
            room: "kitchen",
            type: "lamp",
            ip: "192.168.0.113",
            health: true,
        },
        {
            room: "outdoor",
            type: "ip_camera",
            ip: "192.168.0.143",
            health: true,
        },
        {
            room: "kitchen",
            type: "humidity_sensor",
            ip: "192.168.0.120",
            health: true,
        },
        {
            room: "Humidity sensor at bathroom",
            type: "humidity_sensor",
            ip: "192.168.0.121",
            health: true,
        },
        {
            room: "living room",
            type: "humidity_sensor",
            ip: "192.168.0.122",
            health: true,
        },
        {
            room: "kitchen",
            type: "temperature_sensor",
            ip: "192.168.0.130",
            health: true,
        },
        {
            room: "bathroom",
            type: "temperature_sensor",
            ip: "192.168.0.131",
            health: true,
        },
        {
            room: "living room",
            type: "temperature_sensor",
            ip: "192.168.0.132",
            health: true,
        },
    ];

    return (
        <BaseLayout>
            <Grid2
                container
                spacing={6}
                columns={4}
            >
                {devicesSchema.map((device) => (
                    <Grid2 size={1}>
                        <Device device={device} />
                    </Grid2>
                ))}
            </Grid2>
        </BaseLayout>
    );
}
