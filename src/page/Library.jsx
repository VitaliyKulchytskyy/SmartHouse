import { Stack } from "@mui/material";
import PluginCard from "../components/PluginCard";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Library() {
    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:3001/plugin/list")
            .then((resp) => {                
                const fetched = resp.data.payload.plugins;
                let out = [];
                fetched.map((plugin) => {
                    out.push(plugin);
                });

                setPlugins(out);
            });            
    }, []);

    return (
        <Stack spacing={4}>
            {plugins.map((plugin) => (
                <PluginCard pluginName={plugin.name} isInstalled={plugin.isInstalled}/>
            ))}
        </Stack>
    );
}