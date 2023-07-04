import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GuildAdminDto } from 'src/modules/guilds/dto/GuildAdmin.dto';
import { Guild } from 'src/modules/guilds/model/guild.model';

@Injectable()
export class GuildPermsService {
  constructor(
    @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
  ) {}

  /**Guild Admin */
  async addGuildAdmin(guildId: string, guildAdminDto: GuildAdminDto) {
    const guildAdmin = await this.guildModel.findOne({
      guildId,
      'admins.userId': guildAdminDto.userId,
    });
    if (guildAdmin) {
      throw new ConflictException('Admin already exists');
    }

    await this.guildModel.updateOne(
      { guildId },
      {
        $push: {
          admins: { ...guildAdminDto },
        },
      },
    );
  }

  async updateGuildAdmin(guildId: string, guildAdminDto: GuildAdminDto) {
    await this.guildModel.updateOne(
      { guildId, 'admins.userId': guildAdminDto.userId },
      {
        $set: { 'admins.$': guildAdminDto },
      },
      { new: true },
    );
  }

  async deleteGuildAdmin(guildId: string, userId: string) {
    await this.guildModel.updateOne(
      { guildId, 'admins.userId': userId },
      {
        $pull: { admins: { userId } },
      },
    );
  }
}
