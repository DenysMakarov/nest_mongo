import { Request } from 'express';
import { User } from '@/modules/user/schemas/User.schema';

export interface ExpressRequestInterface extends Request {
  user?: User;
}
