import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/set.metadata';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private readonly authService: AuthService) {
    super();
  }
    
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const result = (await super.canActivate(context)) as boolean;
    if (!result) {
      return false;
    }

    const req = context.switchToHttp().getRequest();
    const isUser = await this.authService.isUser(req.user);
    if (isUser) {
      req.user = isUser;
      return true;
    }

    return false;  
  }
}
