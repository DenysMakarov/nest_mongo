import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const UserDecorator = createParamDecorator(
//   (data: any, ctx: ExecutionContext) => {
//     const req = ctx.switchToHttp().getRequest();
//     return data ? req.user?.[data] : req.user;
//   },
// );

export const UserDecorator = createParamDecorator(
  (data: string[], ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.user) {
      return null;
    }

    if (data && Array.isArray(data)) {
      const result = {};
      data.forEach((key) => {
        result[key] = req.user[key];
      });
      return result;
    }
    return req.user;
  },
);
