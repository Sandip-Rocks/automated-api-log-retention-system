import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { Logger } from '@nestjs/common';
import { LogCleanupUtilityService } from './log-cleanup-utility.service';
import { ApiLogRepository } from '../../sequelize/repository/api-log.repository';
import { ApiLog } from '../../sequelize/models/api-log.model';

describe('LogCleanupUtilityService', () => {
  let service: LogCleanupUtilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SequelizeModule.forFeature([ApiLog])],
      providers: [LogCleanupUtilityService, Logger, ApiLogRepository],
    }).compile();

    service = module.get<LogCleanupUtilityService>(LogCleanupUtilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
