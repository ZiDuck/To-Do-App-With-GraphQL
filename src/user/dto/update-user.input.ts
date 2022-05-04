import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateUserInput {
    @Field({nullable: true})
    passWord?: string

    @Field({nullable: true})
    name?: string
}