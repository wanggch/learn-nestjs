import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserStatus } from './user.model';

@Controller('user')
export class UserController {
  // ✨ 依赖注入！Nest自动将UserService实例注入这里
  constructor(private userService: UserService) { }

  // 获取所有用户
  @Get()
  getAllUser(): User[] {
    return this.userService.getAllUser();
  }

  // 根据ID获取单个用户
  @Get(':id')
  getUserById(@Param('id') id: string): User {
    return this.userService.getUserById(id);
  }

  // 创建用户
  // @Body()装饰器用于从请求体中提取数据
  @Post()
  createUser(@Body("username") username: string, @Body("password") password: string): User {
    return this.userService.createUser(username, password);
  }

  // 根据ID更新用户状态
  @Patch(':id/status')
  updateUserStatus(@Param('id') id: string, @Body('status') status: UserStatus): User {
    return this.userService.updateUser(id, status);
  }

  // 根据ID删除用户
  @Delete(':id')
  deleteUser(@Param('id') id: string): void {
    this.userService.deleteUser(id);
  }
}