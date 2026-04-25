import { CreateReservationInput } from './create-reservation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class UpdateReservationInput extends PartialType(
  CreateReservationInput,
) {
  @Field(() => Int)
  @IsInt()
  id!: number;
}
