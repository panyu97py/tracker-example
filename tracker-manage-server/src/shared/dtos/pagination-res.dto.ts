export class PaginationResDto<T> {
    data: T[]
    total: number;
    pageNum: number;
    pageSize: number;
}