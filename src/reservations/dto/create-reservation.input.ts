import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, IsDate, IsOptional } from 'class-validator';
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

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  reservationDate?: Date = new Date();

  @Field(() => Date)
  @IsDate()
  @Type(() => Date)
  returnDate!: Date;
}
