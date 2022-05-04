import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { Token } from './dto/auth.output';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { User } from 'src/user/entity/user.entity';
import { GetUser } from './decorator/get-user.decorator';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => User)
    async signup(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
        return this.authService.signup(createUserInput);
    }

    @Query(() => Token)
    @UseGuards(GqlAuthGuard)
    async login(@Args('loginInput') LoginInput: LoginInput, @Context() context: any): Promise<Token> {     
        return this.authService.login(context.user); 
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => Token, { name: 'refreshToken' })
    async refresh(@GetUser() user: User): Promise<Token> {
        return this.authService.refresh(user);
    }
}
