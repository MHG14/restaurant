import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class CreateUserInput {
    @Field()
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @Field()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @Field()
    @IsNotEmpty()
    fullName: string
}