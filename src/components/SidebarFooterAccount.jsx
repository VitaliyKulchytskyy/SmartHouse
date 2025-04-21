import axios from "axios";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { Link } from "react-router";
import {
    Account,
    AccountPreview,
    AccountPopoverFooter,
    SignOutButton,
} from "@toolpad/core/Account";

AccountSidebarPreview.propTypes = {
    handleClick: PropTypes.func,
    mini: PropTypes.bool.isRequired,
    open: PropTypes.bool,
};

function AccountSidebarPreview(props) {
    const { handleClick, open, mini } = props;
    return (
        <Stack direction="column" p={0}>
            <Divider />
            <AccountPreview
                variant={mini ? "condensed" : "expanded"}
                handleClick={handleClick}
                open={open}
            />
        </Stack>
    );
}

const account = [
    {
        id: 0,
        name: "0",
        role: "0",
        image: "0",
    },
    {
        id: 1,
        name: "1",
        role: "1",
        image: "1",
    },
];

function SidebarFooterAccountPopover() {
    const [accounts, setAccounts] = React.useState(account);
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
                console.log(fetched);

                const out = fetched.map((user, index) => ({
                    id: index, 
                    name: user.login,
                    role: user.roleName,
                    image: `${user.id}.jpg`,
                }));
                setAccounts(out);
            });
    }, []);

    return (
        <Stack direction="column">
            <Typography variant="body2" mx={2} mt={1}>
                Family
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
                            secondary={account.role}
                            primaryTypographyProps={{ variant: "body2" }}
                            secondaryTypographyProps={{ variant: "caption" }}
                        />
                    </MenuItem>
                ))}
            </MenuList>
            <Divider />
            <AccountPopoverFooter>
                <SignOutButton />
            </AccountPopoverFooter>
        </Stack>
    );
}

const createPreviewComponent = (mini) => {
    function PreviewComponent(props) {
        return <AccountSidebarPreview {...props} mini={mini} />;
    }
    return PreviewComponent;
};

function SidebarFooterAccount({ mini }) {
    const PreviewComponent = React.useMemo(
        () => createPreviewComponent(mini),
        [mini],
    );
    return (
        <Account
            slots={{
                preview: PreviewComponent,
                popoverContent: SidebarFooterAccountPopover,
            }}
            slotProps={{
                popover: {
                    transformOrigin: { horizontal: "left", vertical: "bottom" },
                    anchorOrigin: { horizontal: "right", vertical: "bottom" },
                    disableAutoFocus: true,
                    slotProps: {
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: (theme) =>
                                    `drop-shadow(0px 2px 8px ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.32)"})`,
                                mt: 1,
                                "&::before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    bottom: 10,
                                    left: 0,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform:
                                        "translate(-50%, -50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        },
                    },
                },
            }}
        />
    );
}

SidebarFooterAccount.propTypes = {
    mini: PropTypes.bool.isRequired,
};

export default SidebarFooterAccount;
