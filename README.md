<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

An automated API log retention system built with NestJS that periodically cleans up old logs from the database. This system runs on a scheduled cron job to maintain optimal database performance by removing logs older than the configured retention period.

### Key Features
- **Automated Cleanup**: Runs automatically on a weekly schedule (every Sunday at 3 AM)
- **Configurable Retention**: 60-day rolling retention window
- **Database Optimization**: Removes old logs to prevent unbounded database growth
- **Logging & Monitoring**: Detailed logs for each cleanup operation
- **Sequelize ORM**: Uses Sequelize for database operations

## Workflow Diagram

### System Architecture

```mermaid
graph TB
    A["NestJS Application<br/>(Running 24/7)"] --> B["Cron Service<br/>@Cron: Every Sunday 3 AM"]
    B --> C["Log Cleanup Utility Service<br/>removeOldLogsByDate"]
    C --> D["API Log Repository<br/>deleteApiLogByClause"]
    D --> E["PostgreSQL Database<br/>api_logs table"]
    F["Logger<br/>Console Output"] -.->|Log Events| A
    F -.->|Log Events| B
    F -.->|Log Events| C
```

### Cleanup Workflow Timeline

```mermaid
sequenceDiagram
    participant Clock as System Clock
    participant Cron as Cron Service
    participant Utility as Cleanup Utility
    participant Repo as Repository
    participant DB as Database
    
    Clock->>Cron: Sunday 3:00 AM
    activate Cron
    Cron->>Cron: Calculate cutoff date<br/>(Today - 60 days)
    Cron->>Utility: removeOldLogsByDate(cutoffDate)
    activate Utility
    Utility->>Repo: deleteApiLogByClause({createdAt <= cutoffDate})
    activate Repo
    Repo->>DB: DELETE FROM api_logs<br/>WHERE createdAt <= cutoffDate
    DB-->>Repo: Return deleted count
    deactivate Repo
    Repo-->>Utility: deleted count
    Utility->>Utility: Log success message<br/>with deleted count
    Utility-->>Cron: Complete
    deactivate Utility
    Cron->>Cron: Log completion
    deactivate Cron
```

### 60-Day Retention Scenario

```mermaid
timeline
    title Log Retention Window Over Time
    section Days Ago
        120 days ago: Logs DELETED by cleanup job
        90 days ago: Logs DELETED by cleanup job
        61 days ago: Logs DELETED by cleanup job
        60 days ago: First kept log (EDGE: Cutoff Date)
        30 days ago: Active logs KEPT
        1 day ago: Recent logs KEPT
        Today: Today's logs KEPT
    
    section Cleanup Schedule
        Every Sunday at 3 AM: Evaluate retention
        Logs > 60 days: DELETED
        Logs ≤ 60 days: PRESERVED
```

### Data Flow

```mermaid
graph LR
    A["API Requests"] -->|Create logs| B["API Logs Table"]
    C["Cron Service"] -->|Weekly cleanup| B
    C -->|Calculates 60-day cutoff| D["Date: Now - 60 days"]
    D -->|Deletes older logs| B
    B -->|Maintains rolling window| E["Active Logs Only"]
```

## Installation

## Installation

```bash
$ pnpm install
```

## Database Setup

1. **Install PostgreSQL** and create a database for the application.

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the database configuration variables:
     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_USERNAME=your_postgres_username
     DB_PASSWORD=your_postgres_password
     DB_NAME=api_logs
     ```

3. **Run Database Migrations**
   ```bash
   # Create the database (if it doesn't exist)
   $ pnpm run db:create

   # Run migrations to create tables
   $ pnpm run db:migrate
   ```

4. **Generate New Migrations** (when you need to modify the database schema)
   ```bash
   $ pnpm run migration:generate -- migration_name
   ```

### Database Structure
Database-related files are organized in the `sequelize/` directory:
- `sequelize/config/` - Database configuration files
- `sequelize/migrations/` - Database migration files
- `sequelize/models/` - Sequelize model definitions
- `sequelize/seeders/` - Database seed files

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```



## Stay in touch
Author - Sandip Das (Full Stack Developer | NodeJs | ReactJs | AWS)
Email - sandip4991@gmail.com
LinkedIn - https://www.linkedin.com/in/sandipdas-software/
