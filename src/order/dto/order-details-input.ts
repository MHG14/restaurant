import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import mongoose from 'mongoose';

@InputType()
export class OrderDetailsInput {
  @Field(() => String)
  food: { type: mongoose.Schema.Types.ObjectId; ref: 'Food' };
  @Field(() => Int)
  foodCount: Number;
}
