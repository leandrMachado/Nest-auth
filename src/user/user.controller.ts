import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  read(): Promise<User[]> {
    return this.userService.readAll();
  }

  @Post('create')
  async create(@Body() createdUser: CreateUserDto): Promise<any> {
    console.log('USER_CONTROLLER: ', createdUser);
    return this.userService.create(createdUser);
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  } 

  @Put(':id/update')
  async update(@Param('id') id: number, @Body() user: User): Promise<any> {
    user.id = Number(id);
    return this.userService.update(user);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: number): Promise<any> {
    return this.userService.remove(id);
  }
}
