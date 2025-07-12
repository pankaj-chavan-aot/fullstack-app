 import { NestFactory } from '@nestjs/core';
 import { AppModule } from './app.module';
 import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt.strategy';
import { RolesGuard } from './common/guards/roles.guard';
import cookieParser from 'cookie-parser'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 // app.use(cookieParser()); // Cookies pars
    app.use(cookieParser());

  app.enableCors({
   
     origin: 'http://localhost:3001', 
 
    credentials: true,              
  });   

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
 //app.useGlobalGuards(app.get(JwtAuthGuard), app.get(RolesGuard));
  await app.listen(3000);
}
bootstrap();
