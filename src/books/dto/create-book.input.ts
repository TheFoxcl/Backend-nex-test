import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUrl,
  IsInt,
  Min,
  Max,
} from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title!: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'El autor es obligatorio' })
  author!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl({}, { message: 'La imagen debe ser una URL válida' })
  imageUrl?: string | null;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'El ISBN es obligatorio' })
  isbn!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string | null;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0, { message: 'El año de publicación no puede ser negativo' })
  @Max(new Date().getFullYear())
  publishedYear?: number;
}
