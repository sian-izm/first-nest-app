import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CatsService', () => {
  let service: CatsService;
  let mock = [{
    id: 1,
    name: 'cat',
    age: 1,
    breed: 'hoge',
  }];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of cats', async () => {
      expect(await service.findAll()).toBe(mock);
    });
  });
});
