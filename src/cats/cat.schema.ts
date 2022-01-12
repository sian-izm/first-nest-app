import { Cat } from './cat.entity';
import { EntitySchema } from 'typeorm';

export const CatSchema = new EntitySchema<Cat>({
  name: 'Cat',
  target: Cat,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    breed: {
      type: String,
    }
  }
})
