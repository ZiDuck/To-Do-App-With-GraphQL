import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @Min(6)
    @Max(12)
    passWord: string;
    
    @Field()
    @IsNotEmpty()
    @IsString()
    name: string;
}
