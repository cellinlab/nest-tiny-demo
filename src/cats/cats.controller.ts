import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UseFilters } from '@nestjs/common';

import { CreateCatDto, ListCatsDto, UpdateCatDto } from './dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from '../common/forbidden.exception';
import { HttpExceptionFilter } from '../common/http-exception.filter';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) { }

  @Get('httpException')
  error() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('forbidden')
  forbidden() {
    throw new ForbiddenException();
  }

  @Get('httpExceptionFilter')
  @UseFilters(new HttpExceptionFilter())
  error2() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
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
