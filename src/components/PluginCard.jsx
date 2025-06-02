import { Paper, Divider, Stack, Typography, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import axios from "axios";

export default function PluginCard({ pluginName, isInstalled = false }) {
    const [name, setName] = useState("");
    const [imageSrc, setImageSrc] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:3001/plugin/info?name=${pluginName}`)
            .then((resp) => {
                const fetched = resp.data.payload;
                setName(fetched.manifest.name);
                setImageSrc(fetched.description.icon);

                const fetchedDescription = fetched.description.file;
                axios.get(fetchedDescription, {responseType: 'text'}).then((resp) => {
                    setDescription(resp.data);
                });
            });
    });

    // const [markdown, setMarkdown] = useState("");

    return (
        <Paper elevation={1} className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                <Avatar
                    alt={name}
                    src={imageSrc}
                    sx={{
                        width: {
                            xs: 64, // 96px on small screens
                            lg: 80, // 160px on large screens
                        },
                        height: {
                            xs: 64,
                            lg: 80,
                        },
                    }}
                />
                <div className="flex flex-col gap-3 w-full">
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Divider />
                    <div className="prose max-w-none p-5">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {description}
                        </ReactMarkdown>
                    </div>
                    <Button
                        variant="outlined"
                        className="w-full md:w-fit"
                        disabled={isInstalled}
                    >
                        Install
                    </Button>
                </div>
            </div>
        </Paper>
    );
}
