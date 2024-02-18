import { HttpException, HttpStatus } from "@nestjs/common";

export class AppException extends HttpException {
    constructor(messsage:string) {
      super(messsage, HttpStatus.NOT_ACCEPTABLE);
    }
  }