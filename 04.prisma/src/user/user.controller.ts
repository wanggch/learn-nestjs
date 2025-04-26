import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserStatus } from '@prisma/client';
// 引入我们创建的 DTO
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';

@Controller('user')
export class UserController {
  // ✨ 依赖注入！Nest自动将UserService实例注入这里
  constructor(private userService: UserService) { }

  // 获取所有用户
  @Get()
  async getAllUser(@Query() filterDto: GetUsersFilterDto): Promise<{ users: User[]; total: number }> {
    const { page, limit } = filterDto;
    return this.userService.getAllUser(page, limit);
  }

  // 根据ID获取单个用户
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  // 创建用户
  // @Body()装饰器用于从请求体中提取数据
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto.username, createUserDto.password);
  }

  // 根据ID更新用户状态
  @Patch(':id/status')
  async updateUserStatus(
    @Param('id') id: string,
    @Body() updateUserStatusDto: UpdateUserStatusDto
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserStatusDto.status);
  }

  // 根据ID删除用户
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}