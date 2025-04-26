import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // ✨ 设置为全局模块，这样其他模块无需导入PrismaModule即可注入PrismaService
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 导出服务，以便其他模块可以使用
})
export class PrismaModule {}
