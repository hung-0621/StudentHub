import { createHashRouter } from "react-router";
import App from '../view/App';
import Find from '../view/Find'

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/find",
        element: <Find />,
    }
])