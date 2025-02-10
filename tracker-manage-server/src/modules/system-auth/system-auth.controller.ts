import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SystemAuthLoginDto } from '@/modules/system-auth/system-auth.dto';
import { SystemAuthService } from '@/modules/system-auth/system-auth.service';

@Controller('system-auth')
export class SystemAuthController {
  @Inject()
  private readonly systemAuthService: SystemAuthService;

  @Post('/login')
  async login(@Body() body: SystemAuthLoginDto) {
    await this.systemAuthService.login(body);
  }

  @Post('/register')
  async register(@Body() body: SystemAuthLoginDto) {
    await this.systemAuthService.register(body);
  }
}
