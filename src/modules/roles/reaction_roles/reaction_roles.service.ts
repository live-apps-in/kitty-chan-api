import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReactionRolesDto } from 'src/modules/roles/reaction_roles/dto/reaction_roles.dto';
import { IReactionRoles } from 'src/modules/roles/reaction_roles/interface/reaction_roles.interface';
import { ReactionRoles } from 'src/modules/roles/reaction_roles/model/reaction_roles.model';

@Injectable()
export class ReactionRolesService {
  constructor(
    @InjectModel('reaction_roles')
    private readonly reactionRolesModel: Model<ReactionRoles>,
  ) {}

  async create(
    guildId: string,
    userId: string,
    reactionRoleDto: ReactionRolesDto,
  ) {
    const getReactionRole = await this.reactionRolesModel.findOne({
      name: reactionRoleDto.name,
    });

    if (getReactionRole) {
      throw new ConflictException('Reaction Role already exists!');
    }

    const payload: IReactionRoles = {
      ...reactionRoleDto,
      guildId,
      userId,
    };

    return this.reactionRolesModel.insertMany(payload);
  }

  async get(guildId: string) {
    return this.reactionRolesModel.find({ guildId });
  }

  async update(
    guildId: string,
    reactionRoleId: string,
    reactionRoleDto: ReactionRolesDto,
  ) {
    const getReactionRole = await this.reactionRolesModel.findOne({
      _id: reactionRoleId,
    });

    if (getReactionRole.name !== reactionRoleDto.name) {
      const getReactionRoleByName = await this.reactionRolesModel.findOne({
        name: reactionRoleDto.name,
      });
      if (getReactionRoleByName) {
        throw new ConflictException(
          'Reaction Role with this name already exists!',
        );
      }
    }
    await this.reactionRolesModel.updateOne(
      { _id: reactionRoleId, guildId },
      {
        $set: reactionRoleDto,
      },
    );
  }
}
