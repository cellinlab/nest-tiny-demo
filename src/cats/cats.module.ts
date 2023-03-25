import { Module } from '@nestjs/common';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // share service with other modules, so that they can use it while importing this module
})
export class CatsModule { }
