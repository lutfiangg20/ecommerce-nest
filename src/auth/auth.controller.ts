import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async SignIn(
    @Body() signIn: SignInDto,
    @Headers('user-agent') userAgent: string,
  ) {
    const data = await this.authService.signIn(
      signIn.email,
      signIn.password,
      userAgent,
    );
    return data;
  }

  @Get('refresh')
  async refresh(@Headers('authorization') bearerToken: string) {
    const token = bearerToken.split(' ')[1];
    const data = await this.authService.refreshToken(token);
    return { data };
  }

  @Get('logout')
  async logout(@Headers('authorization') bearerToken: string) {
    const token = bearerToken.split(' ')[1];
    try {
      await this.authService.logout(token);
      return { message: 'Successfully logged out' };
    } catch {
      throw new ServiceUnavailableException();
    }
  }
}
