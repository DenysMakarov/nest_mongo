import { Request } from 'express';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '@/modules/auth/auth.service';
import { UserService } from '@/modules/user/user.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {}, // Mock your UserService if needed
        },
        {
          provide: JwtService,
          useValue: {}, // Mock your JwtService if needed
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('extractTokenFromHeader', () => {
    it('should return the token if authorization header is valid', () => {
      const request = {
        headers: {
          authorization: 'Bearer some.jwt.token',
        },
      } as Request;

      const token = authService.extractTokenFromHeader(request);
      expect(token).toBe('some.jwt.token');
    });

    it('should return undefined if authorization header is not present', () => {
      const request = {
        headers: {},
      } as Request;

      const token = authService.extractTokenFromHeader(request);
      expect(token).toBeUndefined();
    });

    it('should return undefined if authorization header is not a Bearer token', () => {
      const request = {
        headers: {
          authorization: 'Basic some.jwt.token',
        },
      } as Request;

      const token = authService.extractTokenFromHeader(request);
      expect(token).toBeUndefined();
    });

    it('should return undefined if authorization header is malformed', () => {
      const request = {
        headers: {
          authorization: 'MalformedToken',
        },
      } as Request;

      const token = authService.extractTokenFromHeader(request);
      expect(token).toBeUndefined();
    });
  });
});
