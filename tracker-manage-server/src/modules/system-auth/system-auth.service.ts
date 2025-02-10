import { Injectable } from '@nestjs/common';
import { SystemAuthLoginDto } from '@/modules/system-auth/system-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemAuthEntity } from '@/modules/system-auth/system-auth.entity';
import { CustomHttpException } from '@/shared/exceptions';
import { createHash } from 'crypto';

@Injectable()
export class SystemAuthService {
  @InjectRepository(SystemAuthEntity)
  private systemAuthRepository: Repository<SystemAuthEntity>;

  md5Hash(data: string) {
    return createHash('md5').update(data).digest('hex');
  }

  async login(params: SystemAuthLoginDto) {
    const { username, password } = params;
    const result = await this.systemAuthRepository.findOne({
      where: { username, password: this.md5Hash(password) },
    });
    if (result) return true;
    const existingUser = await this.systemAuthRepository.findOne({
      where: { username },
    });
    if (!existingUser) throw new CustomHttpException(`${username} is not exit`);
    throw new CustomHttpException(`password error`);
  }

  async register(params: SystemAuthLoginDto) {
    const { username, password } = params;
    const existingUser = await this.systemAuthRepository.findOne({
      where: { username },
    });
    if (existingUser) throw new CustomHttpException(`${username} is exit`);
    const systemAuthInfo = this.systemAuthRepository.create({
      username,
      password: this.md5Hash(password),
    });
    await this.systemAuthRepository.save(systemAuthInfo);
  }
}
