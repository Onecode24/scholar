import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenService {
    constructor(private jwtService: JwtService) {
        this.jwtService = new JwtService({
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: '1w',
        },
        });
    }
    

  generateRefreshToken(user: any): string {
    // Générez un refresh token unique ici et signez-le avec le secret
    return this.jwtService.sign({ sub: user.id });
  }

  async verifyRefreshToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return payload;
    } catch (error) {
      return null;
    }
  }
}
