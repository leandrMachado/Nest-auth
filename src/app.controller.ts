import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/strategy/local-auth.guard';
import { User } from './entities/user.entity';
import { Public } from './set.metadata';
import { CreateUserDto } from './user/user.dto';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Post('auth/login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<any> {
    return this.authService.signin(req.user)
  }

  @Post('auth/signup')
  @Public()
  async create(@Body() createdUser: CreateUserDto): Promise<any> {
    return this.userService.create(createdUser);
  }
  
}
