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
    const note = await this.repository.save(createdNote);
    return await this.repository.save(note);
  }

  findMyNotes(user_id: number): Promise<Note[]> {
    return this.repository.find({
      select: ['id', 'title', 'note', 'user_id'],
      where: { user_id: String(user_id) }
    })
  }

  findOne(id: number): Promise<Note> {
    return this.repository.findOne({
      select: ['id', 'title', 'note', 'user_id'],
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
