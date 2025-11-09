const Category = require('../src/models/category');
const categoriesService = require('../src/services/categoriesService');

// Mock the Category model
jest.mock('../src/models/category');

describe('Categories Service', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('getAllCategories', () => {
    it('should return all categories', async () => {
      const mockCategories = [
        { id: 1, name: 'Wildlife' },
        { id: 2, name: 'Street' },
        { id: 3, name: 'Cars' }
      ];

      // Mock the findAll method
      Category.findAll.mockResolvedValue(mockCategories);

      const result = await categoriesService.getAllCategories();

      expect(result).toEqual(mockCategories);
      expect(Category.findAll).toHaveBeenCalledTimes(1);
    });

    it('should handle empty categories list', async () => {
      // Mock findAll to return empty array
      Category.findAll.mockResolvedValue([]);

      const result = await categoriesService.getAllCategories();

      expect(result).toEqual([]);
      expect(Category.findAll).toHaveBeenCalledTimes(1);
    });

    it('should handle database errors', async () => {
      // Mock findAll to throw an error
      const error = new Error('Database connection failed');
      Category.findAll.mockRejectedValue(error);

      await expect(categoriesService.getAllCategories())
        .rejects.toThrow('Database connection failed');
      expect(Category.findAll).toHaveBeenCalledTimes(1);
    });
  });
});