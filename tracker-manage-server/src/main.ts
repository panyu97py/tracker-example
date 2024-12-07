import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ResponseInterceptor} from "@/interceptor";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalInterceptors(
        new ResponseInterceptor()
    );

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true, // 自动将请求体转换为 DTO 类实例
            whitelist: true, // 自动移除 DTO 中没有定义的属性
        })
    )

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap.apply(this);
