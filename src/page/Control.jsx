// import { Grid2 } from "@mui/material";
import { Grid } from "@mui/material";
import Device from "../components/Device";
import PluginDashboard from "../components/PluginDashboard";
import BaseLayout from "../layout/BaseLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import toasterParams from "../configs/toaster.json" with { type: "json" };
import PluginControl from "../components/PluginControl";

export default function Control() {
    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:3001/plugin/list").then((resp) => {
            setPlugins(resp.data.payload.plugins);
        });
    }, []);

    const onCommandResponse = (resp) => {
        let out = resp.data.payload;
        if (typeof out.response === 'object' && out.response !== null)
            out.response = JSON.stringify(out.response, null, 2);
        toast.success(`Command name: ${out.name}\nExecute code: ${out.status}` + (out.response ? `\nResponse: ${out.response}` : ""));
    }

    return (
        <Grid container rowSpacing={4} columnSpacing={4}>
            {plugins.map((plugin, index) => (
                <Grid item key={index}>
                    <PluginDashboard
                        name={plugin.name}
                        desciption={plugin.shortDescription}
                    >
                        <PluginControl name={plugin.name} onResponse={onCommandResponse} />
                    </PluginDashboard>
                </Grid>
            ))}
            <Toaster position="bottom-right" />
        </Grid>
    );
}
