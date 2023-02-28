import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/strategy/jwt-auth.guard';
import { LocalAuthGuard } from './auth/strategy/local-auth.guard';

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        console.log(req.user)
       return this.authService.signin(req.user);
    }

    @Post('auth/signup')
    async signup(@Request() req) {
        return this.authService.signup(req.body)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
