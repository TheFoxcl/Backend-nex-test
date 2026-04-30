import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  IsUrl,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

@ObjectType()
export class Book {
  @Field(() => Int)
  @IsInt()
  id!: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  author!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  isbn!: string;

  @Field()
  @IsBoolean()
  isAvailable!: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string | null;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0, { message: 'El año de publicación no puede ser negativo' })
  @Max(new Date().getFullYear())
  publishedYear?: number | null;

  @Field()
  @IsDate()
  @Type(() => Date)
  createdAt!: Date;

  @Field()
  @IsDate()
  @Type(() => Date)
  updatedAt!: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl()
  imageUrl?: string | null;

  @Field(() => Boolean, { defaultValue: true })
  @IsBoolean()
  @Type(() => Boolean)
  isActive!: boolean;
}
