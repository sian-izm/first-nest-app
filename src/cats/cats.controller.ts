import { Controller, Get, HttpCode, Post, Param, Body, HttpException, HttpStatus, UseFilters, ForbiddenException, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { AllExceptionsFilter } from './http-exception.filter';

@Controller('cats')
//@UseFilters(AllExceptionsFilter)
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
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
  }
}
