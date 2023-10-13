import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { AppService } from 'src/app.service';
import { RefreshTokenService } from 'src/refreshToken/refresh-token.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    private refreshTokenService: RefreshTokenService = new RefreshTokenService(new JwtService());

    readonly appService = new AppService(new JwtService({
      secret: process.env.JWT_SECRET,
      signOptions: {
          expiresIn: '1d',
      },
    }));
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,{
            secret: process.env.JWT_SECRET,
          }
        );

        if(payload.exp < Date.now() / 1000){
          const refreshToken = request.cookies['refreshToken'];

          if (!refreshToken || !this.refreshTokenService.verifyRefreshToken(refreshToken)) {
            throw new UnauthorizedException('Token expired and no valid refresh token found.');
          }
          const newAccessToken = await this.appService.generateToken(payload.id);

        }
        
        console.log("authenticate ----->",payload);
        request['user'] = payload;
        
      } catch (error) {
        throw new UnauthorizedException(error.message);
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }