import { Controller, Get, Post, Param, Body, ValidationPipe, Query, DefaultValuePipe, ParseBoolPipe } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ParseIntPipe } from 'src/parse-int.pipe';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ): Promise<Cat[]> {
    console.log(activeOnly);
    console.log(page);
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe()) id) {
    return this.catsService.findOne(id);
  }

  @Post()
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
  }
}
