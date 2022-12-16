import { Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type FoodDocument = HydratedDocument<Food>;

@Schema()
export class Food {
  @Prop({ required: true })
  @Field(() => String)
  foodName: string;

  @Prop({ required: true })
  @Field(() => Int)
  foodInventory: number;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
