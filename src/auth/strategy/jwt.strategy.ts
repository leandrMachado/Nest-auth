import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'hHbNUvmbxZtdFg2Aav8HTe0w3kV2FL4mzTeKuGKKxmDDoJyYp' ,
        });
    }

    async validate(payload: any): Promise<AuthUser> {
        return {
            id: payload.id,
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
        }
    }
}