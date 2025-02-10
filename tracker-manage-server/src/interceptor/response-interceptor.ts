import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {ResponseDto} from "@/shared/dtos";
import {map, Observable} from "rxjs";
import {StatusCode} from "@/shared/constants";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseDto<T>> {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<ResponseDto<T>> {
        return next.handle().pipe(
            map((data) => ({
                data: data,  // 如果没有返回数据，返回 null
                code: StatusCode.SUCCESS,  // 成功时返回 0
                success: true,  // 成功时没有错误信息
                timestamp: Date.now(),
            })),
        );
    }
}
