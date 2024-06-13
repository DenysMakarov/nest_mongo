// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from '@/app.module';
//
// describe('AuthController (e2e)', () => {
//   let app: INestApplication;
//
//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();
//
//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });
//
//   afterAll(async () => {
//     await app.close();
//   });
//
//   it('should register a user', async () => {
//     const response = await request(app.getHttpServer())
//       .post('/auth/register')
//       .send({
//         username: 'testuser',
//         password: 'Test1234!',
//       })
//       .expect(201);
//
//     expect(response.body).toHaveProperty('id');
//     expect(response.body.username).toBe('testuser');
//   });
//
//   it('should login a user', async () => {
//     const response = await request(app.getHttpServer())
//       .post('/auth/login')
//       .send({
//         username: 'testuser',
//         password: 'Test1234!',
//       })
//       .expect(200);
//
//     expect(response.body).toHaveProperty('accessToken');
//   });
//
//   it('should create a user', async () => {
//     const response = await request(app.getHttpServer())
//       .post('/users')
//       .send({
//         username: 'newuser',
//         password: 'NewUser123!',
//         roles: ['user'],
//       })
//       .expect(201);
//
//     expect(response.body).toHaveProperty('id');
//     expect(response.body.username).toBe('newuser');
//   });
//
//   it('should get user by id', async () => {
//     const registerResponse = await request(app.getHttpServer())
//       .post('/auth/register')
//       .send({
//         username: 'anotheruser',
//         password: 'AnotherUser123!',
//       })
//       .expect(201);
//
//     const userId = registerResponse.body.id;
//
//     const response = await request(app.getHttpServer())
//       .get(`/users/${userId}`)
//       .expect(200);
//
//     expect(response.body).toHaveProperty('id');
//     expect(response.body.username).toBe('anotheruser');
//   });
//
//   it('should update user roles', async () => {
//     const registerResponse = await request(app.getHttpServer())
//       .post('/auth/register')
//       .send({
//         username: 'roleuser',
//         password: 'RoleUser123!',
//       })
//       .expect(201);
//
//     const userId = registerResponse.body.id;
//
//     const response = await request(app.getHttpServer())
//       .patch(`/users/${userId}`)
//       .send({
//         roles: ['admin'],
//       })
//       .expect(200);
//
//     expect(response.body.roles).toContain('admin');
//   });
// });
