const bcrypt = require('bcryptjs');
const User = require('../src/models/user');
const usersService = require('../src/services/usersService');

jest.mock('bcryptjs');
jest.mock('../src/models/user');

describe('Users Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('updateUsername', () => {
    const mockUserId = 1;
    const mockUser = {
      id: mockUserId,
      username: 'oldUsername',
      email: 'test@example.com',
      save: jest.fn()
    };

    it('should update username successfully', async () => {
      const newUsername = 'newUsername';
      const mockSafeUser = {
        id: mockUserId,
        username: newUsername,
        email: 'test@example.com',
        age: 25,
        is_admin: false
      };

      User.findByPk
        .mockResolvedValueOnce(mockUser) // First call for finding user
        .mockResolvedValueOnce(mockSafeUser); // Second call for safe user
      User.findOne.mockResolvedValue(null); // No existing user with new username
      mockUser.save.mockResolvedValue(mockUser);

      const result = await usersService.updateUsername(mockUserId, newUsername);

      expect(result).toEqual(mockSafeUser);
      expect(mockUser.save).toHaveBeenCalled();
      expect(User.findByPk).toHaveBeenCalledWith(mockUserId, {
        attributes: ["id", "username", "email", "age", "is_admin"]
      });
    });

    it('should throw error if user not found', async () => {
      User.findByPk.mockResolvedValue(null);

      await expect(usersService.updateUsername(999, 'newUsername'))
        .rejects.toThrow('User not found');
    });

    it('should throw error if username already taken', async () => {
      User.findByPk.mockResolvedValue(mockUser);
      User.findOne.mockResolvedValue({ id: 2, username: 'newUsername' });

      await expect(usersService.updateUsername(mockUserId, 'newUsername'))
        .rejects.toThrow('Username already taken');
    });
  });

  describe('updatePassword', () => {
    const mockUserId = 1;
    const mockUser = {
      id: mockUserId,
      username: 'testUser',
      password: 'hashedOldPassword',
      save: jest.fn()
    };

    it('should update password successfully', async () => {
      const currentPassword = 'oldPassword123';
      const newPassword = 'NewPassword123';
      const hashedNewPassword = 'hashedNewPassword';
      const mockSafeUser = {
        id: mockUserId,
        username: 'testUser',
        email: 'test@example.com',
        age: 25,
        is_admin: false
      };

      User.findByPk
        .mockResolvedValueOnce(mockUser) // First call for finding user
        .mockResolvedValueOnce(mockSafeUser); // Second call for safe user
      bcrypt.compare.mockResolvedValue(true);
      bcrypt.hash.mockResolvedValue(hashedNewPassword);
      mockUser.save.mockResolvedValue(mockUser);

      const result = await usersService.updatePassword(mockUserId, currentPassword, newPassword);

      expect(result).toEqual(mockSafeUser);
      expect(bcrypt.compare).toHaveBeenCalledWith(currentPassword, 'hashedOldPassword');
      expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 10);
      expect(mockUser.save).toHaveBeenCalled();
      expect(mockUser.password).toBe(hashedNewPassword);
    });

    it('should throw error if user not found', async () => {
      User.findByPk.mockResolvedValue(null);

      await expect(usersService.updatePassword(999, 'oldPass', 'newPass'))
        .rejects.toThrow('User not found');
    });

    it('should throw error if current password is incorrect', async () => {
      User.findByPk.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await expect(usersService.updatePassword(mockUserId, 'wrongPass', 'NewPass123'))
        .rejects.toThrow('Current password is incorrect');
    });

    it('should throw error if new password format is invalid', async () => {
      User.findByPk.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);

      await expect(usersService.updatePassword(mockUserId, 'oldPass', 'weak'))
        .rejects.toThrow('u need 8 characters 1 upper letter and 1 number');
    });
  });
});