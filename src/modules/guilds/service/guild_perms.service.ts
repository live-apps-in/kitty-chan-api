import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GuildAdminDto } from 'src/modules/guilds/dto/GuildAdmin.dto';
import { GuildRoleDto } from 'src/modules/guilds/dto/GuildRole.dto';
import { Guild } from 'src/modules/guilds/model/guild.model';
import { Roles } from 'src/modules/guilds/model/roles.model';

@Injectable()
export class GuildPermsService {
  constructor(
    @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
    @InjectModel(Roles.name) private readonly roleModel: Model<Roles>,
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

  /**Guild User Roles */
  async addGuildRole(guildId: string, guildRoleDto: GuildRoleDto) {
    const guildRole = await this.roleModel.findOne({
      guildId,
      permissions: guildRoleDto.permissions,
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
