import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      return user;
    }

    return null;
  }

  async createUser(createUserDto: CreateUserDto) {
    const existedUser = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (!existedUser) {
      try {
        const { name, email, password } = createUserDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.usersRepository.create({
          name,
          email,
          password: hashedPassword,
        });

        await this.usersRepository.insert(newUser);

        return newUser;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const existedUser = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });

    if (existedUser) {
      const updatedUser = await this.usersRepository.update(id, updateUserDto);
      return updatedUser;
    }
  }

  async deleteUser(id: string) {
    const existedUser = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!existedUser) {
      return null;
    }

    const deletingUser = { ...existedUser };

    await this.usersRepository.remove(existedUser);
    return deletingUser;
  }
}
