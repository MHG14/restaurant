import { Field, Int, ObjectType } from '@nestjs/graphql';
import mongoose from 'mongoose';

@ObjectType()
export class OrderDetails {
  @Field(() => String)
  food: { type: mongoose.Schema.Types.ObjectId; ref: 'Food' };
  @Field(() => Int)
  foodCount: Number;
}
