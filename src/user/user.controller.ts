import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const users = await this.userService.findAllUsers();
    return { data: users, message: 'success' };
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    await this.userService.createUser(user);
    return { message: 'success' };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    await this.userService.updateUser(Number(id), user);
    return { message: 'success' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.deleteUser(Number(id));
    return { message: 'success' };
  }
}
