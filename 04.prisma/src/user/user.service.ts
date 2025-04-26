import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  // 注入 PrismaService
  constructor(private prisma: PrismaService) { }

  // 获取所有用户（支持分页）
  async getAllUser(page = 1, limit = 10): Promise<{ users: User[]; total: number }> {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    return { users, total };
  }

  // 获取单个用户
  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return user;
  }

  // 创建用户
  async createUser(username: string, password: string): Promise<User> {
    // 生成盐值并哈希密码
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        status: UserStatus.NORMAL,
      },
    });
  }

  // 更新用户
  async updateUser(id: string, status: UserStatus): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { status },
      });
    } catch (error) {
      // 如果用户不存在，Prisma 会抛出错误
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }
      throw error;
    }
  }

  // 删除用户
  async deleteUser(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      // 如果用户不存在，Prisma 会抛出错误
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }
      throw error;
    }
  }
}