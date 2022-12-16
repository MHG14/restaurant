import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { SeeFoodArgs } from './dto/args/see-food-args';
import { AddFoodInput } from './dto/inputs/add-food-input';
import { Food } from './schemas/food.schema';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel('Food') private readonly foodModel: Model<Food>,
    @InjectModel('User') private readonly UserModel: Model<User>,
  ) {}

  async seeAllFoods() {
    return this.foodModel.find();
  }

  async seeFoodByName(seeFoodArgs: SeeFoodArgs): Promise<Food> {
    return this.foodModel.findOne({ foodName: seeFoodArgs.foodName });
  }

  async addFood(addFoodInput: AddFoodInput): Promise<Food> {
    return this.foodModel.create(addFoodInput);
  }
}
