import { Args, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { SeeFoodArgs } from './dto/args/see-food-args';
import { AddFoodInput } from './dto/inputs/add-food-input';
import { FoodService } from './food.service';
import { Food } from './schemas/food.schema';


@Resolver(() => Food)
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}

  @Query(() => [Food])
  async seeAllFoods() {
    return await this.foodService.seeAllFoods();
  }

  @Query(() => Food)
  async seeFoodByName(
    @Args() seeFoodArgs: SeeFoodArgs,
  ): Promise<Food> {
    return await this.foodService.seeFoodByName(seeFoodArgs);
  }

  @Mutation(() => Food)
  async addFood(
    @Args('addFoodInput') addFoodInput: AddFoodInput,
  ): Promise<Food> {
    return await this.foodService.addFood(addFoodInput);
  }

  // @Mutation()
  // async updateFood() {
  //     return await this.foodService.updateFood()
  // }

  // @Mutation()
  // async deleteFood() {
  //     return await this.foodService.deleteFood()
  // }
}
