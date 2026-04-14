import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK) // Sets response to 200 instead of 201 (Created)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // We pass the validated data to the service
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('refresh')
  async refresh(@Body() refreshData: RefreshDto) {
    // We pass the validated data to the service
    return this.authService.refreshToken(refreshData.refreshToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req: Request) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    return this.authService.logout(token);
  }
}
