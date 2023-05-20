import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/modules/users/model/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: any) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async getByDiscordId(discordId: string) {
    return this.userModel.findOne({ 'discord.id': discordId });
  }

  async update(_id: Types.ObjectId, payload: any) {
    await this.userModel.updateOne(
      { _id },
      {
        $set: payload,
      },
    );
  }
}
