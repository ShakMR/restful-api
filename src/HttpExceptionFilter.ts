import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    if (typeof exceptionResponse === 'string') {
      throw exception;
    }

    const { statusCode, error, message, ...rest } = exceptionResponse as any;
    response.status(status).json({
      errors: {
        title: error,
        detail: message,
        ...rest,
        status: `${statusCode || status}`,
      },
    });
  }
}
