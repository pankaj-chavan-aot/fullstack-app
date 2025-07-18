//  import { NestFactory } from '@nestjs/core';
//  import { AppModule } from './app.module';
//  import { ValidationPipe } from '@nestjs/common';
// import { RolesGuard } from './common/guards/roles.guard';
// import cookieParser from 'cookie-parser'


// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//  // app.use(cookieParser()); // Cookies pars
//     app.use(cookieParser());

//   app.enableCors({
    
   
//      origin: [
//   //  'http://localhost:3001',
//   // 'https://my-auth-colwuype1-pankaj-chavans-projects-fc13a409.vercel.app'

//     // 'http://localhost:3001',
//     'https://my-auth-app-six.vercel.app',
//     'https://my-auth-qkl173jkw-pankaj-chavans-projects-fc13a409.vercel.app', // 👈 हे नवं add करा
// ],
//     credentials: true,                
//   });   
//   app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
//  //app.useGlobalGuards(app.get(JwtAuthGuard), app.get(RolesGuard));
//   await app.listen(3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // app.enableCors({
  //   origin: 'https://my-auth-app-six.vercel.app',
  //     //'https://my-auth-qkl173jkw-pankaj-chavans-projects-fc13a409.vercel.app',
    
  //     credentials: true,
  // });
app.enableCors({
  origin: 'https://my-auth-app-six.vercel.app',
  credentials: true,
});
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ Render compatible port setup
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();      
