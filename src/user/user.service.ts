import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor( @InjectRepository(User) private repository: Repository<User> ) {}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.repository.save(createUserDto)
    return await this.repository.save(user)
  }

  async readAll(): Promise<User[]> {
    return await this.repository.find();
  }

  findOne(username: string): Promise<User> {
    return this.repository.findOne({
      select: ['id', 'username'],
      where: { username }
    })
  }

  async update(user: User): Promise<UpdateResult> {
    return await this.repository.update(user.id, user);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id)
  }
}
