import React from "react";
import {RouteConfig} from "./types";

export interface LayoutCtxVal {
    registerRoute: (routeConfig: RouteConfig) => void;
}

export const LayoutCtx = React.createContext<Partial<LayoutCtxVal>>({})