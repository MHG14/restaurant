import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Food } from 'src/food/schemas/food.schema';
import { Order } from './schemas/order.schema';
import { OrderDetails } from './types/orderDetails.type';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Food') private foodModel: Model<Food>,
    @InjectModel('Order') private orderModel: Model<Order>,
  ) {}

  async orderFood(username: string, orderDetails: OrderDetails): Promise<Food> {
    const food = await this.foodModel.findOne({ foodName: orderDetails.food });
    // Check if the amount that customer has ordered, exists or not
    if (food.foodInventory > orderDetails.foodCount) {
      const newInventory = food.foodInventory - Number(orderDetails.foodCount);
      await this.foodModel.updateOne(
        { foodName: orderDetails.food },
        { $set: { foodInventory: newInventory } },
      );
      const order = {
        orderDetails: [orderDetails],
        username
      }
      await this.orderModel.create(order);
      food.foodInventory = newInventory;
      return food;
    } else {
      throw new HttpException(
        'Sorry! Right now we can not serve this amount',
        HttpStatus.NOT_MODIFIED,
      );
    }
  }
}
