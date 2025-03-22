import {PaginationParams, PaginationResult} from "../types";

export interface EventConfig {
    id: string;
    eventName: string;
    eventType: string;
    eventDesc: string;
}

export interface EventConfigListItem {
    id: string;
    eventName: string;
    eventType: string;
    eventDesc: string;
    createTime: string;
    updateTime: string;
}


export interface IReqId {
    id?: string;
}

export interface IReqEventDataTrendData {
    eventId?:string
    startTimestamp?: number;
    endTimestamp?: number;
}

export interface IReqFetchEventConfigByPage extends PaginationParams {
    eventName: string;
    eventType: string;
}

export type IResFetchEventConfigByPage = PaginationResult<EventConfigListItem>;


export type IResEventConfig = EventConfig

export type IReqCreateEventConfig = Omit<EventConfig, 'id'>

export type IReqUpdateEventConfig = EventConfig
