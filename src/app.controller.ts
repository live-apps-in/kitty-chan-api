import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): any {
    return {
      app: 'kitty chan API',
      port: 5000,
    };
  }
}
