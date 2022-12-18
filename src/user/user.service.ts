import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetUserArgs } from './dto/args/get-user-args';
import { CreateUserInput } from './dto/inputs/create-user-input';
import { UpdateUserInput } from './dto/inputs/update-user-input';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async getUser(getUserArgs: GetUserArgs): Promise<User> {
    return await this.userModel.findOne({ _id: getUserArgs.userId });
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    return this.userModel.create(createUserInput);
  }

  async updateUser(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserInput);
  }

  async deleteUser(id: string) {
    return this.userModel.findOneAndDelete({ _id: id });
  }
}
