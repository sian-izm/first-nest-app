import { Controller, Get, HttpCode, Post, Param, Body } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  @Get()
  async findAll(): Promise<any[]> {
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
  return `This action returns a #${id} cat`;
  }

  @Post()
  @HttpCode(204)
  async create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }
}
