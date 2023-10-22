import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const hashedPassword = this.passwordService.getHash(password, user.salt);
    if (hashedPassword !== user.hash) throw new ForbiddenException();
    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    return { accessToken };
  }

  async signUp(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      throw new BadRequestException({ type: 'email-exists' });
    }
    const salt = await this.passwordService.getSalt();
    const hash = await this.passwordService.getHash(password, salt);
    const createdUser = await this.usersService.create(email, hash, salt);

    const accessToken = await this.jwtService.signAsync({
      id: createdUser.id,
      email: createdUser.email,
    });

    return { accessToken };
  }
}
