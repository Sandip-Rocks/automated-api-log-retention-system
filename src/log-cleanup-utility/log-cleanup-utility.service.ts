import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ApiLogRepository } from '../../sequelize/repository/api-log.repository';
import { Op } from 'sequelize';

@Injectable()
export class LogCleanupUtilityService {
  constructor(
    private readonly logger: Logger,
    private readonly apiLogRepository: ApiLogRepository,
  ) {}

  async removeOldLogs(year: number): Promise<void> {
    this.logger.log(
      this.removeOldLogs.name,
      `Removing logs older than year: ${year}`,
    );
    try {
      const deletedLogsCount = await this.apiLogRepository.deleteApiLogByClause(
        {
          createdAt: {
            [Op.lte]: new Date(year, 0, 1),
          },
        },
      );
      this.logger.log(
        this.removeOldLogs.name,
        `Successfully removed ${deletedLogsCount} old logs`,
      );
    } catch (error) {
      this.logger.error('Error occurred while removing old logs', error);
    }
  }

  async removeOldLogsByDate(cutoffDate: Date): Promise<void> {
    this.logger.log(
      this.removeOldLogsByDate.name,
      `Removing logs older than: ${cutoffDate.toISOString()}`,
    );
    try {
      const deletedLogsCount = await this.apiLogRepository.deleteApiLogByClause(
        {
          createdAt: {
            [Op.lte]: cutoffDate,
          },
        },
      );
      this.logger.log(
        this.removeOldLogsByDate.name,
        `Successfully removed ${deletedLogsCount} old logs`,
      );
    } catch (error) {
      this.logger.error('Error occurred while removing old logs', error);
    }
  }
}
