import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Req } from 'src/types/express.types';

export interface UserRequestContext {
  userId: string;
  guildId: string;
  sessionId: string;
}

/**Extract userId from userData
 * Extract guildId from headers [x-guild-id]
 */
export const ExtractContext = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: Req = context.switchToHttp().getRequest();

    const userData = request.userData;
    const headers = request.headers;

    return {
      userId: userData.userId,
      guildId: headers['x-guild-id'],
      sessionId: userData.sessionId,
    } as UserRequestContext;
  },
);
