import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { Book } from '../books/book.entity';
import {
  IsInt,
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum ReservationStatus {
  ACTIVA = 'ACTIVA',
  DEVUELTO = 'DEVUELTO',
  VENCIDO = 'VENCIDO',
}

registerEnumType(ReservationStatus, {
  name: 'ReservationStatus',
});

@ObjectType()
export class Reservation {
  @Field(() => Int)
  @IsInt()
  id!: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  userId!: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  bookId!: number;

  @Field()
  @IsDate()
  @Type(() => Date)
  reservationDate!: Date;

  @Field()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  returnDate!: Date;

  @Field(() => Date, {
    nullable: true,
    description: 'Fecha real en la que se devolvió el libro',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  realReturnDate?: Date;

  @Field(() => ReservationStatus)
  @IsEnum(ReservationStatus)
  status!: ReservationStatus;

  @Field(() => User)
  @ValidateNested()
  @Type(() => User)
  user!: User;

  @Field(() => Book)
  @ValidateNested()
  @Type(() => Book)
  book!: Book;
}
