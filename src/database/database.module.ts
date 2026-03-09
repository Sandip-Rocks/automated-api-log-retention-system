import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Database } from './database';
import { ApiLog } from '../../sequelize/models/api-log.model';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USERNAME') || 'postgres',
        password: configService.get<string>('DB_PASSWORD') || 'password',
        database: configService.get<string>('DB_NAME') || 'api_logs',
        autoLoadModels: true,
        synchronize: false, // Disable auto-sync for production, use migrations instead
        logging:
          configService.get<string>('NODE_ENV') === 'development'
            ? console.log
            : false,
        models: [ApiLog], // Explicitly add models
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [Database],
  exports: [Database, SequelizeModule],
})
export class DatabaseModule {}
