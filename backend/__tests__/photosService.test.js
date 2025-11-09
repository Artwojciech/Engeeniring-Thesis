const Photo = require('../src/models/photo');
const Category = require('../src/models/category');
const { Op } = require('sequelize');
const photosService = require('../src/services/photosService');
const fs = require('fs');
const path = require('path');

jest.mock('../src/models/photo');
jest.mock('../src/models/category');
jest.mock('path');
jest.mock('fs', () => ({
  promises: {
    unlink: jest.fn().mockResolvedValue()
  }
}));

describe('Photos Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPhotoById', () => {
    it('should return a photo if it exists', async () => {
      const mockPhoto = {
        id: 1,
        title: 'Test Photo',
        filename: 'test.jpg'
      };

      Photo.findByPk.mockResolvedValue(mockPhoto);

      const result = await photosService.getPhotoById(1);
      expect(result).toEqual(mockPhoto);
      expect(Photo.findByPk).toHaveBeenCalledWith(1);
    });

    it('should throw error if photo not found', async () => {
      Photo.findByPk.mockResolvedValue(null);

      await expect(photosService.getPhotoById(999))
        .rejects.toThrow('photo not found');
    });
  });

  describe('getPhotosByCategory', () => {
    const mockCategory = {
      id: 1,
      name: 'Wildlife'
    };

    const mockPhotos = [
      { id: 1, title: 'Photo 1' },
      { id: 2, title: 'Photo 2' }
    ];

    it('should return photos for valid category', async () => {
      Category.findOne.mockResolvedValue(mockCategory);
      Photo.findAndCountAll.mockResolvedValue({
        count: 2,
        rows: mockPhotos
      });

      const result = await photosService.getPhotosByCategory('Wildlife');

      expect(result).toEqual({
        photos: mockPhotos,
        totalItems: 2,
        totalPages: 1,
        currentPage: 1
      });

      expect(Photo.findAndCountAll).toHaveBeenCalledWith({
        where: { category_id: mockCategory.id },
        limit: 20,
        offset: 0,
        order: [['createdAt', 'DESC']]
      });
    });

    it('should handle title search', async () => {
      Category.findOne.mockResolvedValue(mockCategory);
      Photo.findAndCountAll.mockResolvedValue({
        count: 1,
        rows: [mockPhotos[0]]
      });

      await photosService.getPhotosByCategory('Wildlife', 'Photo 1');

      expect(Photo.findAndCountAll).toHaveBeenCalledWith({
        where: {
          category_id: mockCategory.id,
          title: { [Op.iLike]: '%Photo 1%' }
        },
        limit: 20,
        offset: 0,
        order: [['createdAt', 'DESC']]
      });
    });

    it('should throw error for invalid category', async () => {
      Category.findOne.mockResolvedValue(null);

      await expect(photosService.getPhotosByCategory('InvalidCategory'))
        .rejects.toThrow('Category not found');
    });
  });

  describe('createPhoto', () => {
    const mockPhotoData = {
      title: 'New Photo',
      filename: 'photo.jpg',
      category: 'Wildlife'
    };

    it('should create a new photo', async () => {
      const mockCategory = {
        id: 1,
        name: 'Wildlife'
      };

      const mockCreatedPhoto = {
        id: 1,
        title: mockPhotoData.title,
        filename: `uploads/Wildlife/photo.jpg`,
        category_id: mockCategory.id
      };

      Category.findOne.mockResolvedValue(mockCategory);
      Photo.create.mockResolvedValue(mockCreatedPhoto);

      const result = await photosService.createPhoto(mockPhotoData);

      expect(result).toEqual(mockCreatedPhoto);
      expect(Photo.create).toHaveBeenCalledWith({
        title: mockPhotoData.title,
        filename: `uploads/Wildlife/photo.jpg`,
        category_id: mockCategory.id
      });
    });

    it('should throw error for invalid category', async () => {
      Category.findOne.mockResolvedValue(null);

      await expect(photosService.createPhoto(mockPhotoData))
        .rejects.toThrow('Category not found');
    });
  });

  describe('updatePhoto', () => {
    it('should update photo title', async () => {
      const mockPhoto = {
        id: 1,
        title: 'Old Title',
        save: jest.fn()
      };

      Photo.findByPk.mockResolvedValue(mockPhoto);
      mockPhoto.save.mockResolvedValue(mockPhoto);

      const newTitle = 'New Title';
      const result = await photosService.updatePhoto(1, newTitle);

      expect(result).toEqual(mockPhoto);
      expect(mockPhoto.title).toBe(newTitle);
      expect(mockPhoto.save).toHaveBeenCalled();
    });

    it('should throw error if photo not found', async () => {
      Photo.findByPk.mockResolvedValue(null);

      await expect(photosService.updatePhoto(999, 'New Title'))
        .rejects.toThrow('Photo not found');
    });
  });

  describe('deletePhoto', () => {
    it('should delete photo and its file', async () => {
      const mockPhoto = {
        id: 1,
        filename: 'uploads/category/photo.jpg',
        destroy: jest.fn()
      };

      const expectedPath = 'uploads/category/photo.jpg';
      Photo.findByPk.mockResolvedValue(mockPhoto);
      mockPhoto.destroy.mockResolvedValue();
      path.join.mockReturnValue(expectedPath);

      await photosService.deletePhoto(1);

      expect(mockPhoto.destroy).toHaveBeenCalled();
      expect(fs.promises.unlink).toHaveBeenCalledWith(expectedPath);
    });

    it('should throw error if photo not found', async () => {
      Photo.findByPk.mockResolvedValue(null);

      await expect(photosService.deletePhoto(999))
        .rejects.toThrow('Photo not found');
    });

    it('should handle file deletion errors', async () => {
      const mockPhoto = {
        id: 1,
        filename: 'uploads/category/photo.jpg',
        destroy: jest.fn()
      };

      const expectedPath = 'uploads/category/photo.jpg';
      Photo.findByPk.mockResolvedValue(mockPhoto);
      path.join.mockReturnValue(expectedPath);
      fs.promises.unlink.mockRejectedValue(new Error('File deletion failed'));
      mockPhoto.destroy.mockResolvedValue();

      await photosService.deletePhoto(1);

      expect(mockPhoto.destroy).toHaveBeenCalled();
      expect(fs.promises.unlink).toHaveBeenCalledWith(expectedPath);
      // Service should continue even if file deletion fails
    });
  });
});