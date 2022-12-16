import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetUserArgs } from './dto/args/get-user-args';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async getUser(getUserArgs: GetUserArgs): Promise<User> {
    return await this.userModel.findOne({id: getUserArgs.userId})
  }
  // async createUser(create)
}
