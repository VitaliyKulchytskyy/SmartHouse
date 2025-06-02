import { Stack } from "@mui/material";
import MenuList from "@mui/material/MenuList";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState, useMemo } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

export default function Admin() {
    const [accounts, setAccounts] = useState([]);
    const [roles, setRoles] = useState([]);
    const token = Cookies.get("token");

    useEffect(() => {
        axios
            .get("http://127.0.0.1:3001/user/list", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => {
                const fetched = resp.data.users;

                const out = fetched.map((user, index) => ({
                    id: index,
                    name: user.login,
                    role: user.roleName,
                    email: user.email,
                    image: `${user.id}.jpg`,
                }));
                setAccounts(out);
            });

        axios
            .get("http://127.0.0.1:3001/user/listRoles", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => {
                const fetched = resp.data.roles;

                const out = fetched.map((role) => ({
                    id: role.id,
                    name: role.name,
                }));
                setRoles(out);
            });
    }, []);

    return (
        <Stack spacing={2} direction="column">
            <Typography variant="h5" mx={2} mt={1}>
                Users
            </Typography>
            <MenuList>
                {accounts.map((account) => (
                    <MenuItem
                        key={account.id}
                        component="button"
                        sx={{
                            justifyContent: "flex-start",
                            width: "100%",
                            columnGap: 2,
                        }}
                    >
                        <ListItemIcon>
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    fontSize: "0.95rem",
                                    bgcolor: account.color,
                                }}
                                src={account.image ?? ""}
                                alt={account.name ?? ""}
                            >
                                {account.name[0]}
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                width: "100%",
                            }}
                            primary={account.name}
                            secondary={account.email}
                            primaryTypographyProps={{ variant: "body2" }}
                            secondaryTypographyProps={{ variant: "caption" }}
                        />
                    </MenuItem>
                ))}
            </MenuList>
            <Typography variant="h5" mx={2} mt={1}>
                Roles
            </Typography>
            <MenuList>
                {roles.map((role) => (
                    <MenuItem
                        key={role.id}
                        component="button"
                        sx={{
                            justifyContent: "flex-start",
                            width: "100%",
                            columnGap: 2,
                        }}
                    >
                        <ListItemText
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                width: "100%",
                            }}
                            primary={role.name}
                            primaryTypographyProps={{ variant: "body1" }}
                            secondaryTypographyProps={{ variant: "caption" }}
                        />
                    </MenuItem>
                ))}
            <IconButton
                size="large"
                color="secondary"
                variant="contained"
                aria-label="add a new role"
            >
                <AddIcon />
            </IconButton>
            </MenuList>
        </Stack>
    );
}
