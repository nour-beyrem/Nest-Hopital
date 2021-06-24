import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class SecondMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('second middleware');
    next();
  }
}
