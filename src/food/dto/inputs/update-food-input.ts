import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateFoodInput {
  @Field({ nullable: true })
  @IsOptional()
  foodName?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  foodInventory?: number;
}
