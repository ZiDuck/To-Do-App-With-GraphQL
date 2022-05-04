import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PassportModule.register({}), JwtModule.register({}), UserModule],
  providers: [AuthService, AuthResolver, LocalStrategy, GqlAuthGuard, JwtStrategy, JwtAuthGuard],
  exports: [GqlAuthGuard, LocalStrategy]
})
export class AuthModule {}
