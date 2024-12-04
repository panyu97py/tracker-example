import React from "react";

export interface EventConfigManagementCtxVal {
    editEventConfig?: (dataItem:any) => void
    deleteEventConfig?: (dataItem:any) => void
    lookEventDataTrend?: (dataItem:any) => void
}

export const EventConfigManagementCtx = React.createContext<EventConfigManagementCtxVal>({})