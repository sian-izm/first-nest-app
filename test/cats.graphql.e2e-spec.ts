import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import * as request from 'supertest';
import { Cat } from '../src/cats/models/cat.model';
import { Repository } from "typeorm";

const cats: Cat[] = [
  {
    name: "Mike",
    age: 2,
    breed: "mike",
    id: 4,
  }
];

const gql = '/graphql';
let repository: Repository<Cat>;

describe('GraphQL CatsResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    repository = moduleFixture.get('CatRepository');
  });

  afterAll(async () => {
    await repository.query(`delete from cat;`);
    await app.close();
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
    });
    describe('cat', () => {
      it('should get a single cat', async () => {
        await repository.save(cats);

        return request(app.getHttpServer())
          .post(gql)
          .send({ query: '{cat(id: 4){id age name breed}}'})
          .expect(200)
          .expect((res) => {
            expect(res.body.data.cat).toEqual(cats[0]);
          });
      });
    });
    describe('crateCat', () => {
      it('should create a single cat', () => {
        let mutationQuery = `
        mutation {
          createCat(createCat: {id:4, age:2, breed:"mike", name:"Mike"}) {
            id
            age
            breed
            name
          }
        }`;
        return request(app.getHttpServer())
          .post(gql)
          .send({ query: mutationQuery })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createCat).toEqual(cats[0]);
          });
      });
    });
    describe('deleteCat', () => {
      it('should delete a singe cat', async () => {
        await repository.save(cats);

        let mutationQuery = `
        mutation {
          deleteCat(id:4) {
            id
            age
            breed
            name
          }
        }`;
        return request(app.getHttpServer())
          .post(gql)
          .send({ query: mutationQuery })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.deleteCat).toEqual(null);
          });
      });
    })
  })
})
