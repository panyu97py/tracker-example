import {HttpException, HttpStatus} from "@nestjs/common";
import {StatusCode} from "@/shared/constants";

export class CustomHttpException extends HttpException {
    private readonly errorCode: number;

    constructor(message: string, errorCode: number = StatusCode.ERROR, statusCode: HttpStatus = HttpStatus.OK) {
        super({message, errorCode}, statusCode);
        this.errorCode = errorCode;
    }

    // 获取自定义的错误码
    getErrorCode(): number {
        return this.errorCode;
    }
}