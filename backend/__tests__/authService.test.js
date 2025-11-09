const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../src/models/user');
const authService = require('../src/services/authService');

// Mock the dependencies
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../src/models/user');

describe('Auth Service', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    const mockUserData = {
      username: 'testuser',
      email: 'test@example.com',
      age: 25,
      password: 'TestPass123'
    };

    it('should successfully register a new user', async () => {
      // Mock User.findOne to return null (no existing user)
      User.findOne.mockResolvedValueOnce(null);
      User.findOne.mockResolvedValueOnce(null);
      
      // Mock bcrypt hash
      bcrypt.hash.mockResolvedValueOnce('hashedPassword123');
      
      // Mock User.create
      const mockCreatedUser = { 
        id: 1, 
        ...mockUserData, 
        password: 'hashedPassword123',
        is_admin: false 
      };
      User.create.mockResolvedValueOnce(mockCreatedUser);
      
      // Mock findByPk for the safe user
      const mockSafeUser = {
        id: 1,
        username: mockUserData.username,
        email: mockUserData.email,
        age: mockUserData.age,
        is_admin: false
      };
      User.findByPk.mockResolvedValueOnce(mockSafeUser);

      // Mock token generation
      jwt.sign
        .mockReturnValueOnce('mock-access-token')
        .mockReturnValueOnce('mock-refresh-token');

      const result = await authService.registerUser(mockUserData);
      
      expect(result).toEqual({
        user: mockSafeUser,
        tokens: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token'
        }
      });

      expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 10);
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(User.findByPk).toHaveBeenCalledWith(1, {
        attributes: ["id", "username", "email", "age", "is_admin"]
      });
    });

    it('should throw error for invalid password format', async () => {
      const invalidUserData = {
        ...mockUserData,
        password: 'weak'
      };

      await expect(authService.registerUser(invalidUserData))
        .rejects.toThrow('u need 8 characters 1 upper letter and 1 number');
    });

    it('should throw error for existing username', async () => {
      User.findOne.mockResolvedValueOnce({ username: mockUserData.username });

      await expect(authService.registerUser(mockUserData))
        .rejects.toThrow('username already taken');
    });

    it('should throw error for existing email', async () => {
      User.findOne.mockResolvedValueOnce(null); // username check passes
      User.findOne.mockResolvedValueOnce({ email: mockUserData.email }); // email exists

      await expect(authService.registerUser(mockUserData))
        .rejects.toThrow('email already has account');
    });
  });

  describe('generateTokens', () => {
    const mockUser = {
      id: 1,
      is_admin: false
    };

    it('should generate access and refresh tokens', () => {
      jwt.sign
        .mockReturnValueOnce('mock-access-token')
        .mockReturnValueOnce('mock-refresh-token');

      const tokens = authService.generateTokens(mockUser);

      expect(tokens).toEqual({
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token'
      });

      expect(jwt.sign).toHaveBeenCalledTimes(2);
      expect(jwt.sign).toHaveBeenNthCalledWith(
        1,
        { id: mockUser.id, is_admin: mockUser.is_admin },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '300s' }
      );
      expect(jwt.sign).toHaveBeenNthCalledWith(
        2,
        { id: mockUser.id, is_admin: mockUser.is_admin },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );
    });
  });
});