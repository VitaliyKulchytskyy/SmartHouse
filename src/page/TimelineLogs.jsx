import Timeline from "@mui/lab/Timeline";
import Typography from "@mui/material/Typography";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import GrassIcon from "@mui/icons-material/Grass";
import PersonIcon from "@mui/icons-material/Person";
import LogItem from "../components/LogItem";


export default function TimelineLogs() {
    return (
        <Timeline position="alternate">
            <LogItem
                action="Tom was added as a new user"
                timestamp="11.16 am"
                user="Jhon"
                color="success"
            >
                <PersonIcon />
            </LogItem>

            <LogItem
                action="Turn off plant watering"
                timestamp="10.33 am"
                user="System: schedule"
            >
                <GrassIcon />
            </LogItem>

            <LogItem
                action="Turn on plant watering"
                timestamp="10.30 am"
                user="System: schedule"
            >
                <GrassIcon />
            </LogItem>

            <LogItem
                action="Someone try to enter"
                timestamp="10.07 am"
                color="primary"
            >
                <ErrorOutlineIcon />
            </LogItem>

            <LogItem
                action="Stange activity near the house"
                timestamp="9.54 am"
                color="primary"
            >
                <ErrorOutlineIcon />
            </LogItem>

            <LogItem
                action="Open the front door"
                timestamp="9.30 am"
                user="Anna"
            >
                <DoorBackIcon />
            </LogItem>
        </Timeline>
    );
}
