import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemAuthEntity } from './system-auth.entity';
import { SystemAuthService } from '@/modules/system-auth/system-auth.service';
import { SystemAuthController } from '@/modules/system-auth/system-auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SystemAuthEntity])],
  providers: [SystemAuthService],
  controllers: [SystemAuthController],
})
export class SystemAuthModule {}
