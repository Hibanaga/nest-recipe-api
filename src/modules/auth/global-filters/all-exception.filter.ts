import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  constructor(private httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost): any {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    this.logger.error(`
      Exception: ${exception.message}, stack: ${exception.stack}
    `);
    const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      status: httpStatus,
      message: 'Interval server error',
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
