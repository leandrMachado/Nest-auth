import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  read(): Promise<Note[]> {
    return this.noteService.readAll();
  }

  @Post('create')
  async create(@Body() createdNote: CreateNoteDto): Promise<any> {
    console.log('USER_CONTROLLER: ', createdNote);
    return this.noteService.create(createdNote);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.noteService.findOne(id);
  } 

  @Put(':id/update')
  async update(@Param('id') id: number, @Body() note: Note): Promise<any> {
    note.id = Number(id);
    return this.noteService.update(note);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: number): Promise<any> {
    return this.noteService.remove(id);
  }

}
