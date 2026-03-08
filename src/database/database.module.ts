import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Database } from './database';
import { ApiLog } from '../../sequelize/models/api-log.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'api_logs',
      autoLoadModels: true,
      synchronize: false, // Disable auto-sync for production, use migrations instead
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      models: [ApiLog], // Explicitly add models
    }),
  ],
  providers: [Database],
  exports: [Database, SequelizeModule],
})
export class DatabaseModule {}
