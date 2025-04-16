// src/task/dto/create-task.dto.ts
import { IsNotEmpty, IsString } from 'class-validator'; // 引入验证装饰器

export class CreateTaskDto {
  @IsNotEmpty() // 验证规则：不能为空
  @IsString()   // 验证规则：必须是字符串
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}