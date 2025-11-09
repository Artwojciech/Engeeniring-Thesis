const { Op } = require('sequelize');
const Favourite = require('../src/models/favourite');
const Photo = require('../src/models/photo');
const Category = require('../src/models/category');
const favouritesService = require('../src/services/favouritesService');

jest.mock('../src/models/favourite');
jest.mock('../src/models/photo');
jest.mock('../src/models/category');

describe('Favourites Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFavourites', () => {
    const mockUserId = 1;
    const mockPhoto = {
      id: 1,
      title: 'Test Photo',
      filename: 'test.jpg',
      category: {
        id: 1,
        name: 'Wildlife'
      }
    };

    it('should return favourites with pagination', async () => {
      const mockFavourites = [
        { photo: mockPhoto },
        { photo: mockPhoto }
      ];

      Favourite.findAndCountAll.mockResolvedValue({
        count: 2,
        rows: mockFavourites
      });

      const result = await favouritesService.getFavourites(mockUserId);

      expect(result).toEqual({
        photos: mockFavourites.map(fav => fav.photo),
        totalItems: 2,
        totalPages: 1,
        currentPage: 1
      });

      expect(Favourite.findAndCountAll).toHaveBeenCalledWith({
        where: { user_id: mockUserId },
        limit: 20,
        offset: 0,
        order: [['added_at', 'ASC']],
        include: [
          {
            model: Photo,
            as: 'photo',
            include: [{ model: Category, as: 'category' }]
          }
        ]
      });
    });

    it('should handle date filtering', async () => {
      const from = '2025-01-01';
      const to = '2025-12-31';
      
      Favourite.findAndCountAll.mockResolvedValue({
        count: 0,
        rows: []
      });

      await favouritesService.getFavourites(mockUserId, 'asc', from, to);

      expect(Favourite.findAndCountAll).toHaveBeenCalledWith({
        where: {
          user_id: mockUserId,
          added_at: {
            [Op.gte]: new Date(from),
            [Op.lte]: new Date(to)
          }
        },
        limit: 20,
        offset: 0,
        order: [['added_at', 'ASC']],
        include: [
          {
            model: Photo,
            as: 'photo',
            include: [{ model: Category, as: 'category' }]
          }
        ]
      });
    });

    it('should handle invalid date parameters', async () => {
      const invalidDate = 'invalid-date';
      
      Favourite.findAndCountAll.mockResolvedValue({
        count: 0,
        rows: []
      });

      await favouritesService.getFavourites(mockUserId, 'asc', invalidDate);

      const expectedWhere = { 
        user_id: mockUserId,
        added_at: {} // The service creates an empty added_at object even with invalid dates
      };

      expect(Favourite.findAndCountAll).toHaveBeenCalledWith({
        where: expectedWhere,
        limit: 20,
        offset: 0,
        order: [['added_at', 'ASC']],
        include: [
          {
            model: Photo,
            as: 'photo',
            include: [{ model: Category, as: 'category' }]
          }
        ]
      });
    });
  });

  describe('addFavourite', () => {
    it('should create a new favourite', async () => {
      const mockUserId = 1;
      const mockPhotoId = 2;
      const mockFavourite = {
        id: 1,
        user_id: mockUserId,
        photo_id: mockPhotoId,
        added_at: new Date()
      };

      Favourite.create.mockResolvedValue(mockFavourite);

      const result = await favouritesService.addFavourite(mockUserId, mockPhotoId);

      expect(result).toEqual(mockFavourite);
      expect(Favourite.create).toHaveBeenCalledWith({
        user_id: mockUserId,
        photo_id: mockPhotoId
      });
    });
  });

  describe('deleteFavourite', () => {
    it('should delete a favourite', async () => {
      const mockUserId = 1;
      const mockPhotoId = 2;

      Favourite.destroy.mockResolvedValue(1); // 1 row deleted

      await favouritesService.deleteFavourite(mockUserId, mockPhotoId);

      expect(Favourite.destroy).toHaveBeenCalledWith({
        where: {
          user_id: mockUserId,
          photo_id: mockPhotoId
        }
      });
    });

    it('should throw error when favourite not found', async () => {
      const mockUserId = 1;
      const mockPhotoId = 2;

      Favourite.destroy.mockResolvedValue(0); // no rows deleted

      await expect(favouritesService.deleteFavourite(mockUserId, mockPhotoId))
        .rejects.toThrow('favourite wasnt found');
      
      expect(Favourite.destroy).toHaveBeenCalledWith({
        where: {
          user_id: mockUserId,
          photo_id: mockPhotoId
        }
      });
    });
  });

  describe('isFavourite', () => {
    it('should return true for existing favourite', async () => {
      const mockUserId = 1;
      const mockPhotoId = 2;
      
      Favourite.findOne.mockResolvedValue({ id: 1 });

      const result = await favouritesService.isFavourite(mockUserId, mockPhotoId);

      expect(result).toBe(true);
      expect(Favourite.findOne).toHaveBeenCalledWith({
        where: {
          user_id: mockUserId,
          photo_id: mockPhotoId
        }
      });
    });

    it('should return false for non-existent favourite', async () => {
      const mockUserId = 1;
      const mockPhotoId = 2;
      
      Favourite.findOne.mockResolvedValue(null);

      const result = await favouritesService.isFavourite(mockUserId, mockPhotoId);

      expect(result).toBe(false);
      expect(Favourite.findOne).toHaveBeenCalledWith({
        where: {
          user_id: mockUserId,
          photo_id: mockPhotoId
        }
      });
    });
  });
});