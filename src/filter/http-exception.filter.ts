import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
export interface ErrorResponse {
  message: string;
  statusCode: HttpStatus;
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = exception.getStatus();

    let errorResponse: ErrorResponse = {
      message: '',
      statusCode: status,
    };

    switch (status) {
      case 503:
        errorResponse.message = 'Lỗi dịch vụ';
        break;

      case 500:
        errorResponse.message = 'Lỗi máy chủ';
        break;

      default:
        errorResponse.message = exception.message;
    }

    //Finally Send the Modified Response
    response.status(status).json(errorResponse);
  }
}
