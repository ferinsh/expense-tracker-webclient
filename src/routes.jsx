
import { RouterProvider, createBrowserRouter } from "react-router";
import { useAuth } from "./provider/AuthProvider";
import { Account } from "./components/account";

const AppRoutes = () => {
    const { token } = useAuth();

    const routesForAuthenticatedOnly = [
        {
            path: "/account",
            element: <Account />
        }
    ]
    const routesForNotAuthenticatedOnly = [
        {
        path: "/",
        element: <App />,
        },
        {
        path: "/login",
        element: <div>Login</div>,
        },
    ];

    const router = createBrowserRouter([
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    return <RouterProvider router={router} />;
}

export default AppRoutes;