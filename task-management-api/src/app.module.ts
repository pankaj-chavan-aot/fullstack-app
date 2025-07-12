// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { TasksModule } from './tasks/tasks.module';
// import { UsersModule } from './users/users.module';

// @Module({
//   imports: [AuthModule, TasksModule, UsersModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import{ TasksModule } from './tasks/tasks.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({

      type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'task_management',
 // entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true, // production साठी false करा
  autoLoadEntities: true,

    }),
    UsersModule,
    AuthModule,
    TasksModule,
    
  ],
})
export class AppModule {}
