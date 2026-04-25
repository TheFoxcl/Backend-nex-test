import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateReservationInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  userId!: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  bookId!: number;

  @Field(() => Date)
  @IsDate()
  @Type(() => Date)
  reservationDate!: Date;

  @Field(() => Date)
  @IsDate()
  @Type(() => Date)
  returnDate!: Date;
}
