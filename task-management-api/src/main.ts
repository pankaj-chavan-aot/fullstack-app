import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable cookie parsing
  app.use(cookieParser());
app
  // ✅ Enable CORS for both Vercel frontend URLs
  // app.enableCors({
  //   origin: [
  //     'https://my-auth-app-sooty.vercel.app'
  //    // 'https://my-auth-app-six.vercel.app', // Official deployed frontend
  //     //'https://my-auth-j8ftulo1b-pankaj-chavans-projects-fc13a409.vercel.app', // Preview/test frontend
  //   ],
  //   credentials: true,
  // });

  app.enableCors({
  origin: 'fullstack-app-nine-lemon.vercel.app', // ✅ Vercel production domain
  credentials: true,
});

  // ✅ Enable global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ Use Render-compatible dynamic port
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
