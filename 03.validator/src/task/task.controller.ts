import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.model';
// 引入定义好的DTO
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

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
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto.title, createTaskDto.description);
  }

  // 根据ID更新任务状态
  @Patch(':id/status')
  updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
    return this.taskService.updateTask(id, updateTaskStatusDto.status);
  }

  // 根据ID删除任务
  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    this.taskService.deleteTask(id);
  }
}
