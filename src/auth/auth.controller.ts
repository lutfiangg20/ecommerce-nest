import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

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

  @Post('register')
  async Register(@Body() create: CreateUserDto) {
    try {
      await this.userService.createUser(create);
      return 'Registration Successful';
    } catch (error) {
      throw new BadRequestException('user already exists');
    }
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
