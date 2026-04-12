import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK) // Sets response to 200 instead of 201 (Created)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // We pass the validated data to the service
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
