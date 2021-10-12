import store from "../../config/store";
import { IRoute } from "../../utils/components/app_router/custom_types";
import { Home, Location } from "./views";

const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: "/",
            component: Home,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: "/location/",
            component: Location,
        },
    ];
};

export default get_routes;
