import { Controller, Get, HttpCode, Post, Param, Body, HttpException, HttpStatus, UseFilters, ForbiddenException } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { AllExceptionsFilter } from './http-exception.filter';

@Controller('cats')
@UseFilters(AllExceptionsFilter)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
  return `This action returns a #${id} cat`;
  }

  @Post()
  @HttpCode(204)
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    throw new ForbiddenException();
    // this.catsService.create(createCatDto);
  }
}
