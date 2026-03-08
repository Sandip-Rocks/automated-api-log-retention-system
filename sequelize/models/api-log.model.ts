import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'api_logs',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  underscored: true,
})
export class ApiLog extends Model<ApiLog> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  timestamp: Date;

  @Column({
    type: DataType.ENUM('GET', 'POST', 'PUT', 'DELETE', 'PATCH'),
    allowNull: false,
  })
  method: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusCode: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  responseTime: number;

  @Column({
    type: DataType.TEXT,
  })
  userAgent: string;

  @Column({
    type: DataType.STRING(45),
  })
  ipAddress: string;

  @Column({
    type: DataType.JSON,
  })
  requestHeaders: object;

  @Column({
    type: DataType.JSON,
  })
  requestBody: string;

  @Column({
    type: DataType.JSON,
  })
  responseBody: string;

  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @Column({
    type: DataType.STRING(255),
  })
  sessionId: string;

  @Column({
    type: DataType.TEXT,
  })
  errorMessage: string;
}
