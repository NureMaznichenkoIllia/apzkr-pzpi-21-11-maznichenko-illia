import { ComponentType } from "react";
import { LINES_ROUTE, MAIN_ROUTE, MAP_ROUTE, PLATFORMS_ROUTE, SCHEDULE_ROUTE, STAFFS_ROUTE, STATIONS_ROUTE, TRAINS_ROUTE } from "./consts";
import { Lines } from "./pages/Lines";
import { MainPage } from "./pages/MainPage";
import { Map } from "./pages/Map";
import { Platforms } from "./pages/Platforms";
import { Schedules } from "./pages/Schedules";
import { Staffs } from "./pages/Staffs";
import { Stations } from "./pages/Stations";
import { Trains } from "./pages/Trains";

interface RouteData {
    path: string,
    Component: ComponentType,
}

export const applicationRoutes: RouteData[] = [
    { path: MAIN_ROUTE, Component: MainPage },
    { path: LINES_ROUTE, Component: Lines },
    { path: PLATFORMS_ROUTE, Component: Platforms },
    { path: SCHEDULE_ROUTE, Component: Schedules },
    { path: STAFFS_ROUTE, Component: Staffs },
    { path: STATIONS_ROUTE, Component: Stations },
    { path: TRAINS_ROUTE, Component: Trains },
    { path: MAP_ROUTE, Component: Map },
]