import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @MinLength(3)
  @IsOptional()
  username?: string;

  @Field({ nullable: true })
  @MinLength(8)
  @IsOptional()
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  fullName?: string;
}
