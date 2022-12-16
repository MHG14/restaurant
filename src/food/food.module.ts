import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodResolver } from './food.resolver';
import { Food, FoodSchema } from './schemas/food.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
  ],
  providers: [FoodService, FoodResolver],
})
export class FoodModule {}
