import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatSchema } from './cat.schema';
import { CatsResolver } from './cats.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CatSchema])],
  controllers: [CatsController],
  providers: [CatsService, CatsResolver],
})

export class CatsModule {}
