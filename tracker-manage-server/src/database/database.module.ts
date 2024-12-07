import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {Module} from "@nestjs/common";

const config: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: './database.sqlite',
    autoLoadEntities: true,
    synchronize: true,
}

@Module({imports: [TypeOrmModule.forRoot(config)]})

export class DatabaseModule {}