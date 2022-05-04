import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UserService } from 'src/user/user.service';
import { Token } from './dto/auth.output';
import { User } from '@prisma/client';
import { validate, validateOrReject } from 'class-validator';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const loginInput = new LoginInput();
    loginInput.email = email;
    loginInput.password = password;

    return validate(loginInput).then(async(errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        console.log('validation failed. errors: ', errors);
        const listErrors = errors[0].constraints;
        return listErrors;
      } else {
        const user = await this.prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new ForbiddenException('User not found');
        }

        const pwMatches = await bcrypt.compare(password, user.passWord);
        if (!pwMatches) {
          throw new ForbiddenException('Password incorrect');
        }

        const { passWord, ...result } = user;
        return result;
      }
    });
  }

  async signup(data: CreateUserInput): Promise<User> {
    return this.userService.create(data);
  }

  async login(user: User): Promise<Token> {
    const tokens = this.signToken(user.id, user.email);
    return tokens;
  }

  async signToken(userId: number, email: string): Promise<Token> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: secret,
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async refresh(user: User): Promise<Token> {
    return this.signToken(user.id, user.email);
  }
}
