import { HttpException as NestHttpException } from '@nestjs/common';
class HttpException extends NestHttpException {
  constructor(status: number, message: string) {
    super(message, status);
  }
}

export default HttpException;
