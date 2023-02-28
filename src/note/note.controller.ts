import { Controller, Request, Post, UseGuards, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entities/note.entity';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findMyNotes(@Request() req: any): Promise<Note[]> {
    return this.noteService.findMyNotes(req.user.id)
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Request() req: any, @Body() createdNote: CreateNoteDto): Promise<any> {

    const newCreatedNote = { ...createdNote }
    newCreatedNote.user_id = req.user.id
    
    return this.noteService.create(newCreatedNote);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.noteService.findOne(id);
  } 

  @Put(':id/update')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() note: Note): Promise<any> {
    note.id = Number(id);
    return this.noteService.update(note);
  }

  @Delete(':id/delete')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number): Promise<any> {
    return this.noteService.remove(id);
  }

}
