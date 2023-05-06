import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsExeption extends HttpException {
  constructor() {
    super('Invalid credentials', HttpStatus.BAD_REQUEST);
  }
}
