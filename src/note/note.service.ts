import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor( @InjectRepository(Note) private repository: Repository<Note> ) {}

  async create(createdNote: CreateNoteDto): Promise<Note> {
    const user = await this.repository.save(createdNote);
    return await this.repository.save(user);
  }

  async readAll(): Promise<Note[]> {
    return await this.repository.find();
  }

  findAll(): Promise<Note[]> {
    return this.repository.find()
  }

  findOne(id: number): Promise<Note> {
    return this.repository.findOne({
      select: ['id', 'note'],
      where: { id }
    })
  }

  async update(note: Note): Promise<UpdateResult> {
    return await this.repository.update(note.id, note);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id)
  }
}
