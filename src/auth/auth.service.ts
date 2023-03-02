import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async authenticateUser(email: string, pass: string): Promise<AuthUser> {
        const user = await this.userService.findOneByEmail(email);

        if (user && bcrypt.compareSync(pass, user.password)) {
            const { password  , ...result } = user;
            return result;
        }

        return null;
    }

    async signin(user: any): Promise<Token> {
        const payload = { ...user }
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async isUser(payload: AuthUser): Promise<any> {
        const { id } = payload;
        const user = await this.userService.findOne(id);

        if (!user) {
            throw new UnauthorizedException('User has been deleted');
        }

        return user
    }


}