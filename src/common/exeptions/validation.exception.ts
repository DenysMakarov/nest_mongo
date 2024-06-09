import { HttpException, HttpStatus } from '@nestjs/common';
/*
 *  DOES NOT NEED (DEPRECATED)
 * */

export class ValidationException extends HttpException {
  constructor(response: string | string[]) {
    super(
      { statusCode: HttpStatus.BAD_REQUEST, message: response },
      HttpStatus.BAD_REQUEST,
    );
  }
}
