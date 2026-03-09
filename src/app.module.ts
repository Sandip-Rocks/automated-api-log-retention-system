import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CronService } from './cron/cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { LogCleanupUtilityService } from './log-cleanup-utility/log-cleanup-utility.service';
import { ApiLogRepository } from '../sequelize/repository/api-log.repository';
import { ApiLog } from '../sequelize/models/api-log.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    SequelizeModule.forFeature([ApiLog]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CronService,
    Logger,
    LogCleanupUtilityService,
    ApiLogRepository,
  ],
})
export class AppModule {}
