import { Field, ObjectType } from '@nestjs/graphql'

export class PayloadDto {
    sub: number;

    email: string;

    iat: number;

    exp: number;
}