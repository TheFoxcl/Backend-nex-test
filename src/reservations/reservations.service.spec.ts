import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { User, Book, Reservation } from '@prisma/client';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let prisma: PrismaService;

  const mockPrisma = {
    $transaction: jest.fn((cb: (client: any) => Promise<unknown>) =>
      cb(mockPrisma),
    ),
    reservation: { count: jest.fn(), create: jest.fn() },
    user: { findUnique: jest.fn() },
    book: { findUnique: jest.fn(), updateMany: jest.fn() },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get(ReservationsService);
    prisma = module.get(PrismaService);
  });

  const dto = {
    userId: 1,
    bookId: 10,
    reservationDate: new Date(),
    returnDate: new Date(Date.now() + 86400000),
  };

  const setupMocks = (resCount = 0, updateCount = 1) => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({ id: 1 } as User);
    jest
      .spyOn(prisma.book, 'findUnique')
      .mockResolvedValue({ id: 10, isAvailable: true } as Book);
    jest.spyOn(prisma.reservation, 'count').mockResolvedValue(resCount);
    jest
      .spyOn(prisma.book, 'updateMany')
      .mockResolvedValue({ count: updateCount });
    jest
      .spyOn(prisma.reservation, 'create')
      .mockResolvedValue({ id: 99, ...dto } as Reservation);
  };

  describe('Creación de Reservas', () => {
    it('Caso 1: Error si ya tiene 3 libros', async () => {
      setupMocks(3);
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('Caso 2: Éxito cuando todo está OK', async () => {
      setupMocks(0, 1);
      const result = await service.create(dto);
      expect(result.id).toBe(99);
    });

    it('Caso 3: Error de Concurrencia (Alguien ganó el libro antes)', async () => {
      setupMocks(0, 0);
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });
});
