import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private protectPassword(pass: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt)
  }

  async create(createdUser: CreateUserDto): Promise<User> {
    const newCreatedUser = { ...createdUser }
    newCreatedUser.password = this.protectPassword(createdUser.password)

    return await this.userRepository.save(newCreatedUser);
  }

  async readAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email }
    })
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id }
    })
  }

  // if the user update the email it wil re-login
  async update(user: User): Promise<UpdateResult> {
    return await this.userRepository.update(user.id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}