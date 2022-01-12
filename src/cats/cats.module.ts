import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatSchema } from './cat.schema';

@Module({
  imports: [TypeOrmModule.forFeature([CatSchema])],
  controllers: [CatsController],
  providers: [CatsService],
})

export class CatsModule {}
