import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodResolver } from './food.resolver';
import { Food, FoodSchema } from './schemas/food.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [FoodService, FoodResolver, UserService],
})
export class FoodModule {}
