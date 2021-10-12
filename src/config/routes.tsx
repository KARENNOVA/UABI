import React from "react";
import { combineRoutes } from "../utils/components/app_router";
import { IRoute } from "../utils/components/app_router/custom_types";

import { routes as authRoutes } from "../modules/auth";
import { routes as acquisitionsRoutes } from "../modules/acquisitions";
import { routes as homeRoutes } from "../modules/home";

const useRoutes = (props = null): IRoute[] => {
    return combineRoutes(props, [
        authRoutes,
        acquisitionsRoutes,
        homeRoutes
    ]);
};

export default useRoutes;
