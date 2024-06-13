import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // Создание и запуск MongoDB Memory Server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    console.log('MongoMemoryServer URI:', uri); // Добавьте логирование для отладки

    // Подключение к тестовой базе данных
    await mongoose.connect(uri, {}); // Удалите устаревшие параметры

    // Создание тестового модуля NestJS
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    // Отключение и остановка MongoDB Memory Server
    await mongoose.disconnect();
    await mongoServer.stop();
    await app.close();
  });

  afterEach(async () => {
    // Очистка всех коллекций после каждого теста
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // Добавьте ваши тесты здесь
});
