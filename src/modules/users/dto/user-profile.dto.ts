import { User } from 'src/modules/users/model/user.model';

export class UserProfileDto {
  public name: string;
  public discord: UserDiscordProfileDto;
  public activities: UserPresenceActivitiesDto[];
  public activityStatus: string;

  constructor(data: User) {
    this.name = data.name;
    this.discord = new UserDiscordProfileDto(data.discord);
    this.activities = data.activities.map(
      (activity) => new UserPresenceActivitiesDto(activity),
    );
    this.activityStatus = data.activityStatus;
  }
}

export class UserDiscordProfileDto {
  public id: string;
  public username: string;
  public avatar: string;
  public discriminator: string;
  public banner: string;
  public accent_color: number;
  public global_name: string;
  public banner_color: string;

  constructor(data: UserDiscordProfileDto) {
    this.id = data.id;
    this.username = data.username;
    this.avatar = data.avatar;
    this.discriminator = data.discriminator;
    this.banner = data.banner;
    this.accent_color = data.accent_color;
    this.global_name = data.global_name;
    this.banner_color = data.banner_color;
  }
}

export class UserPresenceActivitiesDto {
  public name: string;
  public type: number;
  public details: string;
  public state: string;
  public createdTimestamp: string;

  constructor(data: UserPresenceActivitiesDto) {
    Object.assign(this, data);
  }
}
