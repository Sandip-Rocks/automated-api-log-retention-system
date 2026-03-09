import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LogCleanupUtilityService } from 'src/log-cleanup-utility/log-cleanup-utility.service';

@Injectable()
export class CronService {
  constructor(
    private readonly logger: Logger,
    private readonly logCleanupUtilityService: LogCleanupUtilityService,
  ) {}

  @Cron('0 3 * * 0') // 3 AM every Sunday
  async handleWeeklyCleanup() {
    this.logger.log(
      'Running weekly log cleanup - removing logs older than 60 days',
    );
    const retentionDays = 60;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
    await this.logCleanupUtilityService.removeOldLogsByDate(cutoffDate);
  }
}
