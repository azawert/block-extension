import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const sessionInfo = createParamDecorator(
  (_, ctx: ExecutionContext) => ctx.switchToHttp().getRequest()['session'],
);
