import { IRoute } from "../../utils/components/app_router/custom_types";
import CreateUser from './views/CreateUser';
import Users from './views/Users';
import DetailUser from './views/DetailUser';
import EditUser from './views/EditUser';



const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: "/users/",
            breadcrumbs: [{ name: "Usuarios" }],
            component: Users,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: "/users/create/",
            breadcrumbs: [
                { name: "Usuario", to: "/users/" },
                { name: "Crear" },
            ],
            component: CreateUser,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: "/users/:id/",
            breadcrumbs: [
                { name: "Usuario", to: "/users/" },
                { name: "Detalle" },
            ],
            component: DetailUser,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: "/users/edit/:id/",
            breadcrumbs: [
                { name: "Usuario", to: "/users/" },
                { name: "Editar" },
            ],
            component: EditUser,
        },
    ];
};

export default get_routes;
