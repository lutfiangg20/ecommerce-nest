import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async SignIn(@Body() signIn: SignInDto) {
    const data = await this.authService.signIn(signIn.email, signIn.password);
    return data;
  }
}
