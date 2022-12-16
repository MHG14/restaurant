import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from 'src/order/schemas/order.schema';

export type UserDocument = HydratedDocument<User>;

// Defining the 'Role' enum for GraphQL
enum Role {
  USER,
  ADMIN,
}

registerEnumType(Role, {
  name: 'Role',
});
//////////////////////////////////////

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String)
  username: string;

  @Prop({ required: true })
  @Field(() => String)
  password: string;

  @Prop({ required: true })
  @Field(() => String)
  fullName: string;

  @Prop({ required: true })
  @Field(() => Order)
  orders: Order[];

  @Prop({ required: true, enum: ['USER', 'ADMIN'], default: 'USER' })
  @Field(() => Role)
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
