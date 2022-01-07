import { Controller, Get, Post, Param, Body, UseFilters, ParseIntPipe, UsePipes } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { AllExceptionsFilter } from '../all.exceptions.filter';
import { JoiValidationPipe } from 'src/joi.validation.pipe';

@Controller('cats')
@UseFilters(AllExceptionsFilter)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
  }
}
