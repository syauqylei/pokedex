import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  InternalServerErrorException,
  Put,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MonstersService } from './monsters.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { Roles } from '../../core/guards/roles.guard';
import { Role } from '../users/dto/user.dto';

@Controller('monsters')
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Roles(Role.ADMIN)
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
  findAll(@Query() query, @Request() req) {
    const { type, catched } = query;
    const { userId } = req.user;
    let monsters;
    try {
      monsters = this.monstersService.getMonsters(userId,type,catched);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    return {
      code: 201,
      success: true,
      data: monsters,
    };
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

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @Roles(Role.ADMIN)
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

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @Roles(Role.ADMIN)
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
  @UseGuards(AuthGuard('jwt'))
  @Post('/catched/:id')
  @Roles(Role.USER)
  async toggle(@Param('id') id: string, @Request() req) {
    let ret;
    const userId = req.user.id;
    try {
      ret = this.monstersService.toggleMarkCatch(userId, id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    return {
      code: 200,
      success: true,
      data: ret,
    };
  }
}
