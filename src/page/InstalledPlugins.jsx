import { useEffect, useState } from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import { Link } from "react-router";

export default function InstalledPlugins() {
    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:3001/plugin/list")
            .then((resp) => {
                setPlugins(resp.data.payload.plugins);
            })
            .catch((err) => {});
    }, []);

    return (
        <MenuList>
            {plugins.map((plugin, index) => (
                <MenuItem
                    key={index}
                    component="button"
                    sx={{
                        justifyContent: "flex-start",
                        width: "100%",
                        columnGap: 2,
                    }}
                >
                    <Link to={`plugin/${plugin.name}`}>
                        <ListItemText
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                width: "100%",
                            }}
                            primary={plugin.name}
                            primaryTypographyProps={{ variant: "body1" }}
                            secondaryTypographyProps={{ variant: "caption" }}
                        />
                    </Link>
                </MenuItem>
            ))}
        </MenuList>
    );
}
