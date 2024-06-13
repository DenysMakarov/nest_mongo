// import { UserService } from '@/modules/user/user.service';
// import { Model } from 'mongoose';
// import { User } from '@/modules/user/schemas/User.schema';
// import { UserSettings } from '@/modules/user/schemas/UserSettings.schema';
// import { Test, TestingModule } from '@nestjs/testing';
// import { getModelToken } from '@nestjs/mongoose';
// import { CreateUserDto } from "@/modules/user/dto/CreateUserDto";
//
// describe('UserService', () => {
//   let service: UserService;
//   let userModel: Model<User>;
//   let userSettingsModel: Model<UserSettings>;
//
//   const mockUser = {
//     _id: 'userId',
//     email: 'test@example.com',
//     username: 'testuser',
//     password: 'password123',
//     settings: 'settingsId',
//     save: jest.fn().mockResolvedValue(true),
//   };
//
//   const mockUserSettings = {
//     _id: 'settingsId',
//     someSetting: 'someValue',
//     save: jest.fn().mockResolvedValue(true),
//   };
//
//   const createUserDto: CreateUserDto = {
//     email: 'test@example.com',
//     username: 'testuser',
//     password: 'password123',
//     // settings: { someSetting: 'someValue' },
//   };
//
//   const userId = 'userId';
//
//   const mockUserModel = {
//     new: jest.fn().mockResolvedValue(mockUser),
//     constructor: jest.fn().mockResolvedValue(mockUser),
//     find: jest.fn(),
//     findById: jest.fn(),
//     findOne: jest.fn(),
//     findByIdAndDelete: jest.fn(),
//     save: jest.fn(),
//     exec: jest.fn(),
//   };
//
//   const mockUserSettingsModel = {
//     new: jest.fn().mockResolvedValue(mockUserSettings),
//     save: jest.fn(),
//   };
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UserService,
//         { provide: getModelToken(User.name), useValue: mockUserModel },
//         {
//           provide: getModelToken(UserSettings.name),
//           useValue: mockUserSettingsModel,
//         },
//       ],
//     }).compile();
//
//     service = module.get<UserService>(UserService);
//     userModel = module.get<Model<User>>(getModelToken(User.name));
//     userSettingsModel = module.get<Model<UserSettings>>(
//       getModelToken(UserSettings.name),
//     );
//   });
//
//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
//
//   it('should create a user with settings', async () => {
//     userSettingsModel.prototype.save = jest
//       .fn()
//       .mockResolvedValue(mockUserSettings);
//     userModel.prototype.save = jest.fn().mockResolvedValue(mockUser);
//
//     const result = await service.createUser(createUserDto);
//     expect(userSettingsModel.prototype.save).toHaveBeenCalled();
//     expect(userModel.prototype.save).toHaveBeenCalled();
//     expect(result).toEqual(mockUser);
//   });
//
//   // it('should create a user without settings', async () => {
//   //   const dto = { email: 'test@example.com' };
//   //
//   //   userModel.prototype.save = jest.fn().mockResolvedValue(mockUser);
//   //
//   //   const result = await service.createUser(dto);
//   //   expect(userModel.prototype.save).toHaveBeenCalled();
//   //   expect(result).toEqual(mockUser);
//   // });
//
//   it('should get user by email', async () => {
//     userModel.findOne = jest.fn().mockReturnValue({
//       exec: jest.fn().mockResolvedValue(mockUser),
//     });
//
//     const result = await service.getUserByEmail('test@example.com');
//     expect(userModel.findOne).toHaveBeenCalledWith({
//       email: 'test@example.com',
//     });
//     expect(result).toEqual(mockUser);
//   });
//
//   it('should get all users', async () => {
//     userModel.find = jest.fn().mockReturnValue({
//       populate: jest.fn().mockReturnValue({
//         exec: jest.fn().mockResolvedValue([mockUser]),
//       }),
//     });
//
//     const result = await service.getAllUsers();
//     expect(userModel.find).toHaveBeenCalled();
//     expect(result).toEqual([mockUser]);
//   });
//
//   it('should get user by id', async () => {
//     userModel.findById = jest.fn().mockReturnValue({
//       populate: jest.fn().mockReturnValue({
//         exec: jest.fn().mockResolvedValue(mockUser),
//       }),
//     });
//
//     const result = await service.getUserById(userId);
//     expect(userModel.findById).toHaveBeenCalledWith(userId);
//     expect(result).toEqual(mockUser);
//   });
//
//   it('should delete user', async () => {
//     userModel.findByIdAndDelete = jest.fn().mockReturnValue({
//       exec: jest.fn().mockResolvedValue(mockUser),
//     });
//
//     const result = await service.deleteUser(userId);
//     expect(userModel.findByIdAndDelete).toHaveBeenCalledWith(userId);
//     expect(result).toEqual(mockUser);
//   });
// });
