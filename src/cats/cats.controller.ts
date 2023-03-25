import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';

import { CreateCatDto, ListCatsDto, UpdateCatDto } from './dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from '../common/forbidden.exception';
import { HttpExceptionFilter } from '../common/http-exception.filter';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { createCatSchema } from './dto/CreateCat';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from 'src/decorators/roles.decotator';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) { }

  // @Get('httpException')
  // error() {
  //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  // }

  // @Get('forbidden')
  // forbidden() {
  //   throw new ForbiddenException();
  // }

  // @Get('httpExceptionFilter')
  // @UseFilters(new HttpExceptionFilter())
  // error2() {
  //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  // }

  @Post()
  @UsePipes(new JoiValidationPipe(createCatSchema))
  @Roles('admin')
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): string {
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
