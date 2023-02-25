import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    password: string;
}
