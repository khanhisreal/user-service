/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Roles, User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { UpdateUserDto } from './dto/UpdateUserDto.dto';
import { encodePassword } from 'src/utils/bcrypt';
import {
  buildUserFilter,
  DEFAULT_PAGE_SIZE,
  isIdValid,
} from 'src/utils/constants';
import { PaginationDto } from './dto/Pagination.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers(paginationDto: PaginationDto) {
    const {
      skip = 0,
      limit = DEFAULT_PAGE_SIZE,
      query,
      role,
      status,
    } = paginationDto;

    const filter = buildUserFilter(query);

    //apply role and status filters if provided
    if (role) filter.role = role;
    if (status) filter.status = status;

    const [users, total] = await Promise.all([
      this.userModel.find(filter).skip(skip).limit(limit),
      this.userModel.countDocuments(filter),
    ]);

    return { users, total };
  }

  async getTotalCount() {
    return this.userModel.countDocuments();
  }

  async getById(id: string) {
    if (!isIdValid(id)) {
      throw new HttpException('Invalid id', 400);
    }
    const userDb = await this.userModel.findById(id);
    if (!userDb) {
      throw new NotFoundException('User not found');
    }
    return userDb;
  }

  async createUser(body: CreateUserDto) {
    const pw = encodePassword(body.password);

    try {
      const newUser = await this.userModel.create({
        ...body,
        password: pw,
        //if the body contains role, assign that role, else assign employee
        role: body.role ?? Roles.EMPLOYEE,
      });

      //convert to plain object so we can safely destructure
      const { password, ...userWithoutPassword } = newUser.toObject();
      return userWithoutPassword;
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Email already exists.');
      }
      throw new InternalServerErrorException('Failed to create user.');
    }
  }

  async updateUser(body: UpdateUserDto, id: string) {
    if (!isIdValid(id)) {
      throw new HttpException('Invalid id', 400);
    }

    const updateData: any = { ...body };

    if (body.password) {
      updateData.password = encodePassword(body.password);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async deleteUser(id: string) {
    if (!isIdValid(id)) {
      throw new HttpException('Invalid id', 400);
    }
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return { message: `User ${deletedUser.fullname} deleted successfully` };
  }
}
