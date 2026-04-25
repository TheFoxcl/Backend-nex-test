import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { User as PrismaUser } from '@prisma/client';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: CreateUserInput) {
    return this.prisma.user.create({ data });
  }

  async createUser({ email, name }: CreateUserInput) {
    const user = await this.findOneByEmail(email);

    if (user) {
      throw new ConflictException(
        'El correo ya está registrado con otro usuario',
      );
    }

    return this.create({ email, name });
  }

  async findAll(): Promise<PrismaUser[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
