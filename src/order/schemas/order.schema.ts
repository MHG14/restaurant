import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument, ObjectId } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { OrderDetails } from '../types/orderDetails.type';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
@ObjectType()
export class Order {
  @Field(() => String)
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => OrderDetails)
  orderDetails: OrderDetails[];

  @Prop({ required: true , default: Date.now()})
  @Field(() => GraphQLISODateTime)
  date: mongoose.Schema.Types.Date;

  @Prop({ required: true, type: String, ref: 'User' })
  @Field(() => User)
  username: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
