import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GuildStaffDto } from 'src/modules/guilds/dto/GuildStaff.dto';
import { GuildRoleDto } from 'src/modules/guilds/dto/GuildRole.dto';
import { Guild } from 'src/modules/guilds/model/guild.model';
import { Roles } from 'src/modules/guilds/model/roles.model';

@Injectable()
export class GuildPermsService {
  constructor(
    @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
    @InjectModel(Roles.name) private readonly roleModel: Model<Roles>,
  ) {}

  /**Guild Staff */
  async addGuildStaff(guildId: string, guildStaffDto: GuildStaffDto) {
    const guildStaff = await this.guildModel.findOne({
      guildId,
      'staffs.userId': guildStaffDto.userId,
    });

    if (guildStaff) {
      throw new ConflictException('Staff already exists');
    }

    await this.guildModel.updateOne(
      { guildId },
      {
        $push: {
          staffs: { ...guildStaffDto },
        },
      },
    );
  }

  /**Guild Staff */
  async viewGuildStaff(guildId: string) {
    return this.guildModel.aggregate([
      {
        $match: {
          guildId,
        },
      },
      {
        $unwind: { path: '$staffs' },
      },
      {
        $addFields: { staffId: { $toObjectId: '$staffs.userId' } },
      },
      {
        $lookup: {
          localField: 'staffId',
          foreignField: '_id',
          from: 'users',
          as: 'staff',
        },
      },
      {
        $unwind: '$staff',
      },
      {
        $project: {
          staffs: 1,
          staff: 1,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$staff', '$staffs'],
          },
        },
      },
      {
        $project: {
          name: 1,
          roleId: 1,
          userId: 1,
          'discord.avatar': 1,
          'discord.username': 1,
          isActive: 1,
        },
      },
    ]);
  }

  async updateGuildStaff(
    guildId: string,
    userId: string,
    guildStaffDto: GuildStaffDto,
  ) {
    guildStaffDto.userId = userId;

    await this.guildModel.updateOne(
      { guildId, 'staffs.userId': userId },
      {
        $set: { 'staffs.$': guildStaffDto },
      },
    );
  }

  async deleteGuildStaff(guildId: string, userId: string) {
    await this.guildModel.updateOne(
      { guildId, 'staffs.userId': userId },
      {
        $pull: { staffs: { userId } },
      },
    );
  }

  /**Guild User Roles */
  async addGuildRole(guildId: string, guildRoleDto: GuildRoleDto) {
    const guildRole = await this.roleModel.findOne({
      guildId,
      $or: [
        { name: guildRoleDto.name },
        { permissions: { $all: guildRoleDto.permissions } },
      ],
    });

    if (guildRole) {
      throw new ConflictException('Role already exists');
    }

    return new this.roleModel(guildRoleDto).save();
  }

  //Includes default role
  async viewRoles(guildId: string) {
    return this.roleModel.find({ $or: [{ systemRole: true }, { guildId }] });
  }

  async updateRole(
    guildId: string,
    roleId: string,
    guildRoleDto: GuildRoleDto,
  ) {
    const guildRole = await this.roleModel.findOne({
      _id: { $ne: roleId },
      guildId,
      $or: [
        { name: guildRoleDto.name },
        { permissions: { $all: guildRoleDto.permissions } },
      ],
    });

    if (guildRole) {
      throw new ConflictException('Role already exists');
    }

    await this.roleModel.updateOne(
      { _id: roleId, guildId },
      {
        $set: guildRoleDto,
      },
    );
  }

  async deleteRole(guildId: string, roleId: string) {
    await this.roleModel.deleteOne({ _id: roleId, guildId });
  }
}
