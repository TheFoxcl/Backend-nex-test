import { IsInt } from 'class-validator/types/decorator/typechecker/IsInt';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  @IsInt()
  id!: number;
}
