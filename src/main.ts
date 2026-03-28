import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './db/data-source';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
    console.log('Server running...');
  } catch (err) {
    console.error('App crashed:', err);
  }
}
bootstrap();
