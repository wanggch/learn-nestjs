import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module'; // 导入PrismaModule

@Module({
  imports: [UserModule, PrismaModule], // 导入PrismaModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
