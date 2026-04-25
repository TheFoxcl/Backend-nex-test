import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Reservation } from '../reservations/reservation.entity';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsDate,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@ObjectType()
export class User {
  @Field(() => Int)
  @IsInt()
  id!: number;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field(() => [Reservation], { nullable: 'items' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Reservation)
  reservations?: Reservation[];

  @Field()
  @IsDate()
  @Type(() => Date)
  createdAt!: Date;
}
