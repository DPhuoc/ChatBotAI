import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./routes/homepage/homepage";
import Dashboard from "./routes/dashboard/dashboard";
import Chatpage from "./routes/chatpage/chatpage";
import Rootlayout from "./layout/rootlayout/rootlayout";
import Dashboardlayout from "./layout/dashboardlayout/dashboardlayout";
import Signinpage from "./routes/signinpage/signinpage";
import Signuppage from "./routes/loginpage/signuppage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        element: <Rootlayout />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                element: <Dashboardlayout />,
                children: [
                    {
                        path: "/dashboard",
                        element: <Dashboard />,
                    },
                    {
                        path: "/dashboard/chats/:id",
                        element: <Chatpage />,
                    },
                ],
            },
        ],
    },
    {
        path: "/signin",
        element: <Signinpage />,
    },
    {
        path: "/signup",
        element: <Signuppage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
);
