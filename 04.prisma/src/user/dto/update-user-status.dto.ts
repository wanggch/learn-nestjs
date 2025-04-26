import { IsEnum } from 'class-validator';
import { UserStatus } from '../user.model'; // 引入我们定义的枚举

export class UpdateUserStatusDto {
  @IsEnum(UserStatus) // 验证规则：值必须是UserStatus枚举中的一个
  status: UserStatus;
}