import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import ProtocolTable from "../components/ProtocolTable";

export default function Plugin() {
    const { name } = useParams();
    const [plugin, setPlugins] = useState();
    const [protocol, setProtocol] = useState("");
    const [parsedProtocol, setParsedProtocol] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:3001/plugin/info?name=${name}`)
            .then((resp) => {
                setPlugins(resp.data.payload);

                axios
                    .get(`http://localhost:3001/plugin/protocol?name=${name}`)
                    .then((resp) => {
                        const payload = resp.data.payload;
                        setProtocol(JSON.stringify(payload, null, "\t"));
                        setParsedProtocol(payload);
                    });
            });
    }, [name]);

    return (
        <Stack spacing={2} direction="column">
            <Typography variant="body1">
                Version: {plugin?.manifest.version}
            </Typography>
            <Typography variant="body1">
                Author: {plugin?.manifest.author}
            </Typography>
            <Typography variant="body1">
                License: {plugin?.manifest.license}
            </Typography>
            <Typography variant="body1">
                Source: <a href={plugin?.manifest.source}>github</a>
            </Typography>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Protocol Table</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ProtocolTable data={parsedProtocol} />
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Raw Protocol</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <pre className="text-sm">{protocol}</pre>
                </AccordionDetails>
            </Accordion>
        </Stack>
    );
}
