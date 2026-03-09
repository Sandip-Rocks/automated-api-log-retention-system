import { Injectable, Logger, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiLog } from '../models/api-log.model';
import { WhereOptions } from 'sequelize';

@Injectable()
export class ApiLogRepository {
  constructor(
    @InjectModel(ApiLog)
    private apiLogModel: typeof ApiLog,
    @Inject(Logger)
    private readonly logger: Logger,
  ) {}

  async deleteApiLogByClause(where: WhereOptions<ApiLog>): Promise<number> {
    this.logger.log(this.deleteApiLogByClause.name);
    return await this.apiLogModel.destroy({ where });
  }
}
