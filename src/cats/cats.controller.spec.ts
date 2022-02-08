import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cat } from './cat.entity';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;
  let mock = [{
    id: 1,
    name: 'cat',
    age: 1,
    breed: 'hoge',
  }];

  beforeEach(async () => {

    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(Cat),
          useValue: {
            find: jest.fn().mockResolvedValue(mock),
          }
        }
      ],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      expect(await catsController.findAll()).toBe(mock);
    });
  })
});
