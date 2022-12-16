import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AddFoodInput {
  @Field()
  @IsNotEmpty()
  foodName: string;

  @Field(() => Int)
  @IsNotEmpty()
  foodInventory: number;
}
