import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { UpdateUserDto } from './dto/UpdateUserDto.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Roles } from './schemas/user.schema';
import { RolesDecorator } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { PaginationDto } from './dto/Pagination.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @RolesDecorator(Roles.MANAGER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers(@Query() paginationDto: PaginationDto) {
    return this.userService.getUsers(paginationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/count')
  getTotalCount() {
    return this.userService.getTotalCount();
  }

  @RolesDecorator(Roles.MANAGER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @RolesDecorator(Roles.MANAGER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUser(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(body, id);
  }

  @RolesDecorator(Roles.MANAGER)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteId(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
