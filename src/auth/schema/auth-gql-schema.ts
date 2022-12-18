import { Field, Mutation, ObjectType } from '@nestjs/graphql';
import { Tokens } from '../types/tokens-type';

@ObjectType()
export class AuthGQLSchema {
  @Field()
  register: Tokens;
}
