import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Catch(HttpException)
export class ErrorHandler implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        response
            .status(status)
            .json({
                statusCode: status,
                message: exception.message,
            });
    }
}