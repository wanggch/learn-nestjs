import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.model';

@Controller('task')
export class TaskController {
  // ✨ 依赖注入！Nest自动将TasksService实例注入这里
  constructor(private taskService: TaskService) { }

  // 获取所有任务
  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  // 根据ID获取单个任务
  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  // 创建任务
  // @Body()装饰器用于从请求体中提取数据
  @Post()
  createTask(@Body("title") title: string, @Body("description") description: string): Task {
    return this.taskService.createTask(title, description);
  }

  // 根据ID更新任务状态
  @Patch(':id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
    return this.taskService.updateTask(id, status);
  }

  // 根据ID删除任务
  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    this.taskService.deleteTask(id);
  }
}
