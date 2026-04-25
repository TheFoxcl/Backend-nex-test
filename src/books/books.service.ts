import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from '../books/book.entity';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Book[]> {
    return await this.prisma.book.findMany();
  }

  async create(data: CreateBookInput): Promise<Book> {
    return await this.prisma.book.create({ data });
  }

  async remove(id: number): Promise<Book> {
    return await this.prisma.book.delete({ where: { id } });
  }

  async updateAvailability(id: number, isAvailable: boolean): Promise<Book> {
    return await this.prisma.book.update({
      where: { id },
      data: { isAvailable },
    });
  }

  async update(id: number, data: UpdateBookInput): Promise<Book> {
    return await this.prisma.book.update({
      where: { id },
      data,
    });
  }
}
