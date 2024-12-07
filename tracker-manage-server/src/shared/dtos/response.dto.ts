export class ResponseDto<T> {
    data?: T;
    code: number;
    success: boolean;
    message?: string;
    timestamp: number;
}