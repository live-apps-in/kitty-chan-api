/**Guild Feature Flag Config */
export interface IGuildFeatureFlag {
  /**Status to identity if guild allowed to function */
  isGuildActive: boolean;

  features: {
    //Guild welcome message
    welcomer: {
      isActive: boolean;
      channelId: boolean;
    };

    //Portal
    portal: {
      isActive: boolean;
      channelId: boolean;
    };

    //Guild updates logger
    logger: {
      isActive: boolean;
      messageUpdate: {
        isActive: boolean;
        channelId: string;
      };
      messageDelete: {
        isActive: boolean;
        channelId: string;
      };
      memberNicknameUpdate: {
        isActive: boolean;
        channelId: string;
      };
      memberUsernameUpdate: {
        isActive: boolean;
        channelId: string;
      };
      memberAvatarUpdate: {
        isActive: boolean;
        channelId: string;
      };
      memberAddRole: {
        isActive: boolean;
        channelId: string;
      };
    };
  };
}
