import {RouteProps} from "react-router-dom";

export interface RouteExtData{
    title: string;
}
export type RouteConfig = RouteExtData&RouteProps