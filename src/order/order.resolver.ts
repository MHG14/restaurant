import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { AtGuard } from 'src/common/guards/at.guard';
import { Food } from 'src/food/schemas/food.schema';
import { OrderDetailsInput } from './dto/order-details-input';
import { OrderService } from './order.service';
import { Order } from './schemas/order.schema';
import { OrderDetails } from './types/orderDetails.type';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @UseGuards(AtGuard)
  @Mutation(() => Food)
  async orderFood(
    @GetCurrentUser('sub') username: string,
    @Args('orderDetails') orderDetails: OrderDetailsInput,
  ): Promise<Food> {
    return await this.orderService.orderFood(username, orderDetails);
  }
}
