import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Redis from 'ioredis';
import { Model } from 'mongoose';
import { FeaturesEnum } from 'src/common/enum/features.enum';
import { PROVIDER_TYPES } from 'src/core/provider.types';
import { FeaturesRepo } from 'src/modules/features/repository/features.repo';
import { GuildRepo } from 'src/modules/guilds/repo/guild.repo';
import { PortalDto, PortalRoomDto } from 'src/modules/portal/dto/portal.dto';
import { PortalRoom } from 'src/modules/portal/model/portal_room.model';

@Injectable()
export class PortalService {
  constructor(
    @Inject(FeaturesRepo) private readonly featureRepo: FeaturesRepo,
    @Inject(PROVIDER_TYPES.RedisClient) private readonly redisClient: Redis,
    @Inject(GuildRepo) private readonly guildRepo: GuildRepo,
    @InjectModel('portal_rooms')
    private readonly portalRoom: Model<PortalRoom>,
  ) {}

  /**Get Portal Config */
  async getPortalConfig(guildId: string) {
    return this.featureRepo.findSingleFeature(guildId, FeaturesEnum.PORTAL);
  }

  /**Update Portal Config */
  async updatePortalConfig(guildId: string, portalDto: PortalDto) {
    await this.featureRepo.updateSingleFeature(
      guildId,
      FeaturesEnum.PORTAL,
      portalDto,
    );

    const portalConfig = await this.featureRepo.findSingleFeature(
      guildId,
      FeaturesEnum.PORTAL,
    );

    //Update Redis cache
    await this.redisClient.set(
      `guild-${guildId}:feature:portal`,
      JSON.stringify(portalConfig),
    );

    return portalDto;
  }

  /**Create Portal Room*/
  async createPortalRoom(
    guildId: string,
    userId: string,
    portalRoomDto: PortalRoomDto,
  ) {
    const getPortalRoom = await this.getPortalRoom(guildId);
    if (getPortalRoom) {
      throw new ConflictException('Portal Room already exists!');
    }

    const { name } = await this.guildRepo.findById(guildId);

    const portalRoom: PortalRoom = {
      ...portalRoomDto,
      guildId,
      guildName: name,
      guilds: [
        {
          name,
          guildId,
        },
      ],
      createdBy: userId,
    };

    return this.portalRoom.insertMany(portalRoom);
  }

  /**Get Portal Room*/
  async getPortalRoom(guildId: string) {
    return this.portalRoom.findOne({ guildId });
  }

  /**Update Portal Room*/
  async updatePortalRoom(guildId: string, portalRoomDto: PortalRoomDto) {
    await this.portalRoom.updateOne(
      { guildId },
      {
        $set: portalRoomDto,
      },
    );
  }
}
