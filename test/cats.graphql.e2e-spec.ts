import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import * as request from 'supertest';
import { Cat } from '../src/cats/models/cat.model';
import { Repository } from "typeorm";

const cats: Cat[] = [
  {
    name: 'Mike',
    age: 1,
    breed: 'mike',
    id: 3,
  }
];

const gql = '/graphql';
let repository: Repository<Cat>;

describe('GraphQL CatsResolver (e2e)', () => {
  let app: INestApplication;
  // FIXME: arrange to use mock
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    repository = moduleFixture.get('CatRepository');
  });

  afterAll(async () => {
    await app.close();
    repository.query(`TRUNCATE FROM cat;`);
  });

  describe(gql, () => {
    describe('cats', () => {
      it('should get the cats array', async () => {
        await repository.save(cats);
        return request(app.getHttpServer())
          .post(gql)
          .send({ query: '{cats {id name age breed}}' })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.cats).toEqual(cats);
          });
      });
    })
  })
})
