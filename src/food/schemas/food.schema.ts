import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type FoodDocument = HydratedDocument<Food>;

@ObjectType()
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
