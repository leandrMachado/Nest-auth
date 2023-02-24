import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateNoteDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    note: string;
}
