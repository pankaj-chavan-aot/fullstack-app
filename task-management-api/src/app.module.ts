
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';
// import{ ConfigModule } from '@nestjs/config';
// import { UsersModule } from './users/users.module';
// import{ TasksModule } from './tasks/tasks.module';
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('ENV:', process.env);

// @Module({
// imports: [
//     ConfigModule.forRoot({ isGlobal: true }), // ✅ enable .env
    
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: process.env.DB_HOST,
//      // port: +process.env.DB_PORT,
//       port: parseInt(process.env.DB_PORT || '5432', 10),
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       synchronize: true,
//       autoLoadEntities: true,
      
//     }),
//     UsersModule,
//     AuthModule,
//     TasksModule,
//   ],
  
// })

// export class AppModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,

      // ✅ For Render PostgreSQL
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}
