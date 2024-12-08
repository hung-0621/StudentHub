import { createHashRouter } from "react-router";
import App from '../view/App';
import Find from '../view/Find'
import Create from "../view/Create";
import Update from "../view/Update";
import Delete from "../view/Delete";

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/find",
        element: <Find />,
    },
    {
        path: "/create",
        element: <Create />,
    },
    {
        path: "/update",
        element: <Update />,
    },
    {
        path: "/delete",
        element: <Delete />,
    },
])