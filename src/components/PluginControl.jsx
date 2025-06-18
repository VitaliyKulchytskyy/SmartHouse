import {
    Stack,
    Typography,
    Button,
    Input,
    TextField,
    OutlinedInput,
    FormControl,
    InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

function CommandHandler({
    pluginName,
    commandName,
    args = [],
    onResponse = () => {},
}) {
    const handleClick = () => {
        axios
            .post(`http://localhost:3001/plugin/command?name=${pluginName}`, {
                name: commandName,
                args: args,
            })
            .then((resp) => {
                onResponse(resp);
                console.log(resp);
            });
    };

    return (
        <Button variant="contained" onClick={handleClick}>
            Send
        </Button>
    );
}

function CommandInput({ command, pluginName, onResponse = () => {} }) {
    const [args, setArgs] = useState(Array(command.arguments.length).fill(""));
    const handleInputChange = (index, value, type) => {
        const updated = [...args];
        if (type !== "object")
            updated[index] = type === "number" ? Number.parseInt(value) : value;
        else {
            updated[index] = JSON.parse(value);
        }
        setArgs(updated);
    };

    return (
        <Stack direction="row" spacing={4} alignItems="center">
            <Typography variant="h6">{command.name}</Typography>
            <Stack spacing={1} alignItems="flex-start">
                {command.arguments.map((arg, index) => (
                    <Stack
                        key={index}
                        spacing={1}
                        alignItems="flex-start"
                        direction="raw"
                    >
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="arg">{arg.name}</InputLabel>
                            <Input
                                id="arg"
                                type={arg.type}
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        e.target.value,
                                        arg.type,
                                    )
                                }
                            />
                        </FormControl>
                    </Stack>
                ))}
            </Stack>
            <CommandHandler
                pluginName={pluginName}
                commandName={command.name}
                args={args}
                onResponse={onResponse}
            />
        </Stack>
    );
}

function CommandInvoke({ command, pluginName, onResponse = () => {} }) {
    return (
        <Stack direction="row" spacing={4}>
            <Typography variant="h6">{command.name}</Typography>
            <CommandHandler
                pluginName={pluginName}
                commandName={command.name}
                onResponse={onResponse}
            />
        </Stack>
    );
}

export default function PluginControl({ name, onResponse = () => {} }) {
    const [commands, setCommands] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/plugin/protocol?name=${name}`)
            .then((resp) => {
                const payload = resp.data.payload.commands;
                setCommands(payload);
            });
    }, [name]);

    return (
        <Stack spacing={3} className="m-5">
            {commands.map((cmd) =>
                cmd.arguments.length === 0 ? (
                    <CommandInvoke
                        command={cmd}
                        pluginName={name}
                        onResponse={onResponse}
                    />
                ) : (
                    <CommandInput
                        command={cmd}
                        pluginName={name}
                        onResponse={onResponse}
                    />
                ),
            )}
        </Stack>
    );
}
