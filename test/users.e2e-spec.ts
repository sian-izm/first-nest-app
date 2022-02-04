import { NestApplication } from "@nestjs/core";
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from "../src/app.module";
import { Repository } from "typeorm";
import { User } from "src/users/user.model";
import * as request from 'supertest';

let repository: Repository<User>;
let gql = '/graphql';
const users: User[] = [
  {
    id: 1,
    name: 'Hoge',
    password: 'UpdateMe',
  },
]

describe('GraphQL UsersResolver (e2e)', () => {
  let app: NestApplication;

  beforeAll(async() => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    repository = moduleFixture.get(('UserRepository'));
  });

  afterAll(async() => {
    await repository.query(`delete from user;`);
    await app.close();
  });

  describe(gql, () => {
    describe('user', () => {
      it('should get a single user', async () => {
        await repository.save(users);

        return request(app.getHttpServer())
          .post(gql)
          .send({ query: '{user(name: "Hoge"){id name password}}'})
          .expect(200)
          .expect((res) => {
            expect(res.body.data.user).toEqual(users[0]);
          });
      });
    });
    describe('createUser', () => {
      it('should create a user', async () => {
        let mutationQuery = `
        mutation {
          signup(input: {id:1, name:"Hoge", password:"UpdateMe"}) {
            id
            name
            password
          }
        }`;
        return request(app.getHttpServer())
          .post(gql)
          .send({ query: mutationQuery })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.signup).toEqual({
              id: 1,
              name: "Hoge",
              password: "UpdateMe",
            });
          });
        });
    });
  });
})