import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import React from "react";

import Error from "./page/Error.jsx";
import Welcome from "./page/SignIn.jsx";
import Registration from "./page/SignUp.jsx";

import App from "./page/App.jsx";
import Layout from "./page/Layout.jsx";
import Dashboard from "./page/Dashboard.jsx";
import Control from "./page/Control.jsx";

import { deepPurple, purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Admin from "./page/Admin.jsx";
import TimelineLogs from "./page/TimelineLogs.jsx";
import DeveloperTools from "./page/DeveloperTools.jsx";
import Scenarios from "./page/Scenarios.jsx";
import Library from "./page/Library.jsx";
import Plugin from "./page/Plugin.jsx";
import InstalledPlugins from "./page/InstalledPlugins.jsx";

// const router = createBrowserRouter([
//     {
//         path: "/*",
//         element: <Error status="404" message="Page not found" />,
//     },
//     {
//         path: "/",
//         element: <Welcome />,
//     },
//     {
//         path: "/registration",
//         element: <Registration />,
//     },
//     {
//         path: "/main",
//         element: <Main />,
//         children: [
//             // {
//             //     path: "dashboard",
//             //     element: <Dashboard />,
//             // },
//             // {
//             //     path: "control",
//             //     element: <Control />,
//             // },
//             // {
//             //     path: "adminPanel",
//             //     element: <AdminPanel />,
//             // },
//             // {
//             //     path: "security",
//             //     element: <Security />,
//             // },
//             // {
//             //     path: "schedule",
//             //     element: <Schedule />,
//             // },
//             // {
//             //     path: "logs",
//             //     element: <Logs />,
//             // },
//         ],
//     },
// ]);

const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: "/",
                Component: Layout,
                children: [
                    {
                        path: "",
                        Component: Dashboard,
                    },
                    {
                        path: "control",
                        Component: Control,
                    },
                    {
                        path: "admin",
                        Component: Admin
                    },
                    {
                        path: "timeline",
                        Component: TimelineLogs
                    },
                    {
                        path: "scenarios",
                        Component: Scenarios
                    },
                    {
                        path: "dev",
                        Component: DeveloperTools
                    },
                    {
                        path: "library",
                        Component: Library
                    },
                    {
                        path: "installed",
                        Component: InstalledPlugins,
                    },
                    {
                        path: "installed",
                        children: [
                            {
                                path: "plugin/:name",
                                Component: Plugin,
                            }
                        ]
                    }
                ],
            },
        ],
    },
    {
        path: "/signin",
        element: <Welcome />,
    },
    {
        path: "/signup",
        element: <Registration />,
    },
    {
        path: "/*",
        element: <Error status="404" message="Page not found" />,
    },
]);

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

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>,
);
