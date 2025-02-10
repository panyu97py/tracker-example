import { IsString } from 'class-validator';

export class SystemAuthLoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
