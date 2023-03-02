import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Request,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  read(): Promise<User[]> {
    return this.userService.readAll();
  }

  @Get('profile')
  getProfile(@Request() req: any): Promise<User> {
    return this.userService.findOne(req.user.id)
  }

  // if the user update the email it wil re-login
  @Put('update')
  async update(@Request() req: any, @Body() user: User): Promise<any> {
    user.id = req.user.id;
    return this.userService.update(user);
  }

  @Delete('delete')
  async delete(@Request() req: any): Promise<any> {
    return this.userService.delete(req.user.id);
  }

}
