import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor( @InjectRepository(User) private repository: Repository<User> ) {}

  protectPassword(pass: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt)
  }

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.repository.save(createUserDto)

    const newUser = { ...user }
    newUser.password = this.protectPassword(user.password)

    return await this.repository.save(newUser)
  }

  async findOne(email: string): Promise<User> {
    return this.repository.findOne({
      select: ['id', 'username', 'email', 'password'],
      where: { email }
    })
  }
}