import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { LoggerMiddleware } from './common/logger.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsModule } from './cats/cats.module';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({
        path: 'cats',
        method: RequestMethod.GET,
      });
  }
}
