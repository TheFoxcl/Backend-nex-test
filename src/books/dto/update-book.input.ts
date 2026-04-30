import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateBookInput } from './create-book.input';
import { IsBoolean, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => Int)
  @IsInt()
  id!: number;

  @Field(() => Boolean, { defaultValue: true })
  @IsBoolean()
  @Type(() => Boolean)
  isActive!: boolean;
}
