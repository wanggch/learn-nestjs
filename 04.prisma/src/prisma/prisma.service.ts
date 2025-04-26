import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // 当应用启动时连接数据库
  async onModuleInit() {
    await this.$connect();
  }

  // 当应用关闭时断开数据库连接
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
