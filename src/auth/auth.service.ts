import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await this.usersService.create({
      name: user.name,
      id: user.id,
      password: hashedPassword,
    });
    createdUser.password = undefined;
    return createdUser;
  }

  async authenticatedUser(name: string, plainTextPassword: string) {
    const user = await this.usersService.findOne(name);
    if (!user) {
      throw new HttpException('User does not exist or incorrect password', HttpStatus.BAD_REQUEST);
    }
    await this.verifyPassword(plainTextPassword, user.password);
    user.password = undefined;
    return user;
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException('User does not exist or incorrect password', HttpStatus.BAD_REQUEST);
    }
  }
}
