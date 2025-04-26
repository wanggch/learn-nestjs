import { IsNotEmpty, IsString } from 'class-validator'; // 引入验证装饰器

export class CreateUserDto {
  @IsNotEmpty() // 验证规则：不能为空
  @IsString()   // 验证规则：必须是字符串
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}