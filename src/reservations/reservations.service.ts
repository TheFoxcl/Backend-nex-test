import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateReservationInput } from './dto/create-reservation.input';
import { PrismaService } from '../prisma/prisma.service';
import { validateDateRange } from '../utils/date-validator.util';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(createReservationInput: CreateReservationInput) {
    const { userId, bookId, reservationDate, returnDate } =
      createReservationInput;

    await this.validateUserAndBook(userId, bookId);
    await this.validateUserLimits(userId);
    validateDateRange(reservationDate, returnDate, 15);

    return this.prisma.$transaction(async (tx) => {
      const updateResult = await tx.book.updateMany({
        where: { id: bookId, isAvailable: true },
        data: { isAvailable: false },
      });

      if (updateResult.count === 0) {
        throw new BadRequestException('El libro ya no está disponible.');
      }

      return tx.reservation.create({
        data: { ...createReservationInput, status: 'ACTIVA' },
        include: { book: true, user: true },
      });
    });
  }

  async findAll() {
    return await this.prisma.reservation.findMany({
      include: {
        book: true,
        user: true,
      },
    });
  }

  async returnBook(reservationId: number) {
    return await this.prisma.$transaction(async (tx) => {
      const reservation = await this.validateReservationForReturn(
        tx,
        reservationId,
      );

      const updatedReservation = await tx.reservation.update({
        where: { id: reservationId },
        data: { status: 'DEVUELTO', realReturnDate: new Date() },
        include: { book: true, user: true },
      });

      await tx.book.update({
        where: { id: reservation.bookId },
        data: { isAvailable: true },
      });

      return updatedReservation;
    });
  }

  async findByUser(userId: number, startDate?: Date, endDate?: Date) {
    return this.prisma.reservation.findMany({
      where: {
        userId,
        reservationDate: {
          ...(startDate && { gte: startDate }),
          ...(endDate && { lte: endDate }),
        },
      },
      include: { book: true, user: true },
    });
  }

  async findByBook(bookId: number, startDate?: Date, endDate?: Date) {
    return this.prisma.reservation.findMany({
      where: {
        bookId,
        reservationDate: {
          ...(startDate && { gte: startDate }),
          ...(endDate && { lte: endDate }),
        },
      },
      include: { book: true, user: true },
    });
  }

  private async validateUserAndBook(userId: number, bookId: number) {
    const [user, book] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.book.findUnique({ where: { id: bookId } }),
    ]);

    if (!user) throw new NotFoundException('El usuario no existe.');
    if (!book) throw new NotFoundException('El libro no existe.');
    if (!book.isAvailable)
      throw new BadRequestException('El libro no está disponible.');
  }

  private async validateUserLimits(userId: number) {
    const activeCount = await this.prisma.reservation.count({
      where: { userId, status: 'ACTIVA' },
    });

    if (activeCount >= 3) {
      throw new BadRequestException(
        'El usuario ya alcanzó el límite de 3 libros reservados.',
      );
    }
  }

  private async validateReservationForReturn(
    tx: Prisma.TransactionClient,
    reservationId: number,
  ) {
    const reservation = await tx.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!reservation) {
      throw new NotFoundException('La reserva no existe.');
    }

    if (reservation.status === 'DEVUELTO') {
      throw new BadRequestException(
        'Este libro ya fue devuelto anteriormente.',
      );
    }

    return reservation;
  }
}
