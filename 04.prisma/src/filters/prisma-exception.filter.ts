import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '发生了内部服务器错误';

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = '该记录已存在';
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = '找不到记录';
        break;
      // 添加更多错误代码处理...
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: true,
    });
  }
} 