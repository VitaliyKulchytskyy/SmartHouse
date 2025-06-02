import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { createTheme } from "@mui/material/styles";
import { deepPurple, purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import SubjectIcon from "@mui/icons-material/Subject";
import ExtensionIcon from "@mui/icons-material/Extension";
import DownloadIcon from "@mui/icons-material/Download";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Outlet } from "react-router";
import PropTypes from "prop-types";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import SidebarFooterAccount from "../components/SidebarFooterAccount";
import { Box, Avatar, Typography } from "@mui/material";

const NAVIGATION = [
    {
        kind: "header",
        title: "Main",
    },
    {
        segment: "",
        title: "Dashboard",
        icon: <DashboardIcon />,
    },
    {
        segment: "control",
        title: "Control",
        icon: <SettingsRemoteIcon />,
    },
    {
        segment: "admin",
        title: "Admin Panel",
        icon: <AdminPanelSettingsIcon />,
    },
    {
        segment: "timeline",
        title: "Timeline Log",
        icon: <SubjectIcon />,
    },
    {
        segment: "scenarios",
        title: "Scenarios",
        icon: <PendingActionsIcon />,
    },
    {
        segment: "dev",
        title: "Developer Tools",
        icon: <LogoDevIcon />,
    },

    {
        kind: "divider",
    },

    {
        kind: "header",
        title: "Plugins",
    },
    {
        segment: "library",
        title: "Library",
        icon: <ExtensionIcon />,
    },
    {
        segment: "installed",
        title: "Installed",
        icon: <DownloadIcon />,
        children: [
            // {
            //     segment: "plugin/debug",
            //     title: "Debug"
            // }
        ],
    },
];

const demoSession = {
    user: {
        name: "",
        email: "",
    },
};

const BRANDING = {
    title: "Smart House",
    logo: <></>,
};

const theme = createTheme({
    palette: {
        primary: {
            main: deepPurple[300],
        },
        secondary: {
            main: purple[500],
        },
    },
});

App.propTypes = {
    window: PropTypes.func,
};

export default function App(props) {
    const token = Cookies.get("token");
    const [session, setSession] = React.useState(demoSession);
    const [nav, setNavigation] = React.useState(NAVIGATION);
    let navigateTo = useNavigate();

    useEffect(() => {
        axios
            .get("http://127.0.0.1:3001/user/validate", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((resp) => {
                const fetchUser = resp.data.user;
                setSession({
                    user: {
                        name: fetchUser.login,
                        email: fetchUser.roleName,
                        image: `/public/${fetchUser.id}.jpg`,
                    },
                });
            })
            .catch((err) => {
                navigateTo("/signin");
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/plugin/list").then((resp) => {
            const plugins = resp.data.payload.plugins;
    
            setNavigation((prevNav) => {
                const updatedNav = [...prevNav];
    
                const installedIndex = updatedNav.findIndex(
                    (item) => item.segment === "installed"
                );
    
                if (installedIndex !== -1) {
                    const installedItem = { ...updatedNav[installedIndex] };
    
                    const existingSegments = new Set(
                        (installedItem.children || []).map((c) => c.segment)
                    );
    
                    const newChildren = plugins
                        .filter((plugin) => plugin.isInstalled) // ✅ Only installed plugins
                        .map((plugin) => ({
                            segment: `plugin/${plugin.name}`,
                            title: plugin.name,
                        }))
                        .filter((pluginItem) => !existingSegments.has(pluginItem.segment));
    
                    installedItem.children = [
                        ...(installedItem.children || []),
                        ...newChildren,
                    ];
    
                    updatedNav[installedIndex] = installedItem;
                }
    
                return updatedNav;
            });
        });
    }, []);    
    

    const authentication = React.useMemo(() => {
        return {
            signOut: () => {
                setSession(null);
                Cookies.remove("token");
                navigateTo("/signin");
            },
        };
    }, []);

    return (
        <ReactRouterAppProvider
            navigation={nav}
            branding={BRANDING}
            theme={theme}
            authentication={authentication}
            session={session}
        >
            <DashboardLayout
                slots={{
                    toolbarAccount: () => null,
                    sidebarFooter: SidebarFooterAccount,
                }}
            >
                <PageContainer maxWidth="full">
                    <Outlet />
                </PageContainer>
            </DashboardLayout>
        </ReactRouterAppProvider>
    );
}
