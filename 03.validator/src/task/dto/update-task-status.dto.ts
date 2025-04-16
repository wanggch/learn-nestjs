// src/task/dto/update-task-status.dto.ts
import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model'; // 引入我们定义的枚举

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus) // 验证规则：值必须是TaskStatus枚举中的一个
  status: TaskStatus;
}
