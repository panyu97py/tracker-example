export interface PaginationParams {
    pageNum: number;
    pageSize: number;
}

export interface PaginationResult<T> {
    data: T[]
    total: number;
    pageNum: number;
    pageSize: number;
}

export interface ResponseData<T = any> {
    data?: T;
    code: number;
    success: boolean;
    message?: string;
    timestamp: number;
}