import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { FoodModule } from './food/food.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/restaurant'),
    GraphQLModule.forRoot<ApolloDriverConfig>({

      driver: ApolloDriver,
      autoSchemaFile: './schema.graphql',
      playground: true,
    }),
    UserModule,
    OrderModule,
    FoodModule,
    AuthModule,
  ],
})
export class AppModule {}
