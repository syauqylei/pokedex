import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  InternalServerErrorException,
  Put,
} from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';

@Controller('monsters')
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @Post()
  create(@Body() createMonsterDto: CreateMonsterDto) {
    let monster;
    try {
      monster = this.monstersService.create(createMonsterDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    return {
      code: 201,
      success: true,
      data: monster,
    };
  }

  @Get()
  findAll() {
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    let monster;
    try {
      monster = this.monstersService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    return {
      code: 200,
      success: true,
      data: monster,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMonsterDto: UpdateMonsterDto) {
    let monster;
    try {
      monster = this.monstersService.update(id, updateMonsterDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    return {
      code: 200,
      success: true,
      data: monster,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    let monster;
    try {
      monster = this.monstersService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    return {
      code: 200,
      success: true,
      data: monster,
    };
  }
}
