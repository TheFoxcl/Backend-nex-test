import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateBookInput } from './create-book.input';
import { IsInt } from 'class-validator';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => Int)
  @IsInt()
  id!: number;
}
