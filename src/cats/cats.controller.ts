import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';

import { CreateCatDto, ListCatsDto, UpdateCatDto } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListCatsDto): string {
    return 'This action returns all cats (filtered by query)';
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Get(':id')
  findOne2(@Param('id') id): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
