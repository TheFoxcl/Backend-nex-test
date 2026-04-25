import { BadRequestException } from '@nestjs/common';

export const validateDateRange = (
  startDate: Date,
  endDate: Date,
  maxDays: number,
) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (startDate < now) {
    throw new BadRequestException(
      'La fecha inicial no puede ser anterior a hoy.',
    );
  }

  if (endDate <= startDate) {
    throw new BadRequestException(
      'La fecha final debe ser posterior a la inicial.',
    );
  }

  const diffInMs = endDate.getTime() - startDate.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays > maxDays) {
    throw new BadRequestException(
      `El periodo máximo permitido es de ${maxDays} días.`,
    );
  }
};
