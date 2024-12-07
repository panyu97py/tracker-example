import {CallHandler, Catch, ExecutionContext, HttpException, Injectable, NestInterceptor} from "@nestjs/common";
import {catchError, Observable, throwError} from "rxjs";
import {ResponseDto} from "@/shared/dtos";

@Injectable()
@Catch()
export class ErrorInterceptor implements NestInterceptor<any, ResponseDto<any>> {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<ResponseDto<any>> {
        return next.handle().pipe(
            catchError((error) => {
                const message = error.message || 'Internal server error';
                const code = error?.getErrorCode() || error.getStatus() || 500;
                const timestamp = Date.now();
                const errorResponse: ResponseDto<any> = {code, success: false, message, timestamp};
                return throwError(() => new HttpException(errorResponse, error.getStatus()));
            }),
        );
    }
}