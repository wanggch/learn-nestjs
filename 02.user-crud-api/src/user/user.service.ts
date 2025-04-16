import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserStatus } from './user.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  // 使用私有数组模拟数据库
  private users: User[] = [];

  // 获取所有用户
  getAllUser(): User[] {
    return this.users;
  }

  // 获取单个用户
  getUserById(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  // 创建用户
  createUser(username: string, password: string): User {
    const user: User = {
      id: uuid(),
      username,
      password,
      status: UserStatus.NORMAL,
    };
    this.users.push(user);
    return user;
  }

  // 更新用户
  updateUser(id: string, status: UserStatus): User {
    const user = this.getUserById(id);
    user.status = status;
    return user;
  }

  // 删除用户
  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

}